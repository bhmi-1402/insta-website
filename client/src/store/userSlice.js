import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState:{
        data:""
    },
    reducers:{
        addUser:(state,action)=>{
            console.log(action.payload);
            state.data = action.payload;
            return;
        },
        removeUser:(state,action)=>{
            state.data=false;
            return
        }
    }
})

export const { addUser,removeUser } = user.actions
export default user.reducer;
