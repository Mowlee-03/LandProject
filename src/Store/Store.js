import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import snackbarReducer from './slices/snackBarslice';
export const store = configureStore({
    reducer:{
        auth:authReducer,
        snackbar: snackbarReducer
    }
})