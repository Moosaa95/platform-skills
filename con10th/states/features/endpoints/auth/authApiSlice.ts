import { apiSlice } from "@/states/services/apiSlice";
import { setAuth } from "../../slices/auth/authSlice";


interface User {
	first_name: string;
	last_name: string;
	email: string;
}



const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		retrieveUser: builder.query<User, void>({
			query: () => '/users/me/',
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/jwt/create',
				method: 'POST',
				body: { email, password },
			}),
			invalidatesTags: ["User"],
		}),
		register: builder.mutation({
			query: ({
				first_name,
				last_name,
				email,
				password,
				role,
			}) => ({
				url: '/register',
				method: 'POST',
				body: { first_name, last_name, email, password, role},
			}),
			invalidatesTags: ["Auth", "User"],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                  await queryFulfilled;
                  dispatch(setAuth());
                  console.log('Logged in successfully');
                } catch (err) {
                  console.error('Failed to login');
                }
            }
		}),
		
		logout: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
			invalidatesTags: ["User"],
		}),
		verifyOtp: builder.mutation({
			query: ({
				email,
				otp
			}) => ({
			  url: '/verify_otp',
			  method: 'POST',
			  body: {email, otp}
			}),
		}),
		resendOtp: builder.mutation({
			query: ({email}) => ({
			  url: '/resend_otp',
			  method: 'POST',
			  body: {email}
			}),
		}),
		// resetPassword: builder.mutation({
		// 	query: email => ({
		// 		url: '/users/reset_password/',
		// 		method: 'POST',
		// 		body: { email },
		// 	}),
		// }),
		// resetPasswordConfirm: builder.mutation({
		// 	query: ({ uid, token, new_password, re_new_password }) => ({
		// 		url: '/users/reset_password_confirm/',
		// 		method: 'POST',
		// 		body: { uid, token, new_password, re_new_password },
		// 	}),
		// }),
	}),
});

export const {
	useRetrieveUserQuery,
	// useSocialAuthenticateMutation,
	useLoginMutation,
	useRegisterMutation,
	// useVerifyMutation,
	useLogoutMutation,
	useVerifyOtpMutation,
	useResendOtpMutation,
	// useActivationMutation,
	// useResetPasswordMutation,
	// useResetPasswordConfirmMutation,
} = authApiSlice;