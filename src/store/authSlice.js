import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userStatus: false,
    userdata: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userStatus = true;
            state.userdata = action.payload;
        },
        logout: (state) => {
            state.userStatus = false;
            state.userdata = null;
        }
    }
})

export const { login, logout } = authSlice.actions //exporting the reducer actions from the slice 

export default authSlice.reducer //exporting the reducer 