import {createSlice} from "@reduxjs/toolkit"
interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}


const initialState = {
    isAuthenticated: false,
    isLoading: true
} as AuthState


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: state => {
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
        },
        logout: state => {
            state.isAuthenticated = false 
            localStorage.setItem("isAuthenticated", JSON.stringify(false));
        },
        finishInitialLoad: state => {
            state.isLoading = false;
        }
    }
})


export const {setAuth, logout, finishInitialLoad} = authSlice.actions;

export default authSlice.reducer;


export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectIsLoading = (state: any) => state.auth.isLoading;