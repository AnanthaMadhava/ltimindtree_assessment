import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persisteConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: 'Hello'
});

const persistedReducer = persistReducer(persisteConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export default store;