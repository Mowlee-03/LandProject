import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        authmodal: false,
    },
    reducers:{
        openAuthmodal: (state, action) => {
            state.authmodal = action.payload
          },
          
    }
})

export const { openAuthmodal } = authSlice.actions
export default authSlice.reducer