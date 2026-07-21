import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    // reducers updates the data inside state
    reducers:{
        setUserData:(state, action)=>{
        state.userData = action.payload
        }
    }
})

// exported the reducer
export const { setUserData } = userSlice.actions

export default userSlice.reducer