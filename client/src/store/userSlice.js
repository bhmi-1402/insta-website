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
        }
    }
})

export const { addUser } = user.actions
export default user.reducer;
