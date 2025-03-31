import {createSlice} from "@reduxjs/toolkit"
interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    pendingVerificationEmail: string | null
}


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    pendingVerificationEmail: null
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
        },
        setPendingVerificationEmail: (state, action) => {
            state.pendingVerificationEmail = action.payload
          },
          clearPendingVerificationEmail: (state) => {
            state.pendingVerificationEmail = null
          }
    }
})


export const {
    setAuth, 
    logout, 
    finishInitialLoad, 
    setPendingVerificationEmail, 
    clearPendingVerificationEmail 
} = authSlice.actions;

export default authSlice.reducer;


export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectIsLoading = (state: any) => state.auth.isLoading;