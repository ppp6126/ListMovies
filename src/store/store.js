import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import counterReducer from '../Slice/counterSlice';
import regionReducer from '../Slice/regionSlice';
import favoritesReducer from '../Slice/favoritesSlice';
import languageReducer from '../Slice/languageSlice';
import modeSlice from '../Slice/modeSlice';
import storage from 'redux-persist/lib/storage';
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
        region : regionReducer ,
        favorites : favoritesReducer,
        language : languageReducer,
        mode : modeSlice ,
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