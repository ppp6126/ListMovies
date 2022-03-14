import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import counterReducer from '../Slice/counterSlice';
import userReducer from '../Slice/userSlice';
import favoritesReducer from '../Slice/favoritesSlice';
import languageReducer from '../Slice/languageSlice'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import { combineReducers } from "redux";

const reducers = combineReducers({
        counter : counterReducer ,
        user : userReducer ,
        favorites : favoritesReducer,
        language : languageReducer
  });
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });