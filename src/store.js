import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './hook/slice/authSlice';

const persisteConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice.reducer
});

const persistedReducer = persistReducer(persisteConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat()
});