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
        },
        updateUser:(state,action)=>{
            return{
                ...state.data,
                followers:action.payload.followers,
                following:action.payload.following
            }
        },
        updatePic:(state,action)=>{
            state.data.pic = action.payload;
        }
    }
})

export const { addUser,removeUser,updateUser,updatePic } = user.actions
export default user.reducer;
