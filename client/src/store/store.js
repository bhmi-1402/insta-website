import { configureStore } from "@reduxjs/toolkit";
import  user from './userSlice';
import { persistStore , persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:"persist-key-2",
    storage
}

const reducer = combineReducers({user});
 
const persistedReducer = persistReducer(persistConfig,reducer); 

const appStore = configureStore({
    reducer: persistedReducer
});

export default appStore;