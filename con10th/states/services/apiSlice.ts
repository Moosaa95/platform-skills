import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError
} from "@reduxjs/toolkit/query"

import { setAuth, logout } from "../features/slices/auth/authSlice" 
import {Mutex} from "async-mutex"


function getCookie(name: string): string | null {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const mutex = new Mutex(); // to prevent race conditions

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
    credentials: 'include',
    prepareHeaders: async (headers, {getState}) => {
        console.log('getting state=======', getState());
        
        const csrftoken = getCookie('csrftoken');
        if (csrftoken) {
            headers.set('X-CSRFToken', csrftoken);
            
        }
        console.log('CRSF', csrftoken);
        return headers;
    },
})


const baseQueryWithReauth: BaseQueryFn<
string|FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                {
                    url: 'jwt/refresh',
                    method: 'POST',

                },
                api, 
                extraOptions
                );
                if (refreshResult.data){
                    api.dispatch(setAuth)

                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout())
                }
            }finally {
                release()
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result 
}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})