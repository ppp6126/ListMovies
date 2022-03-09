import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../Slice/counterSlice';
import userReducer from '../Slice/userSlice';
import favoritesReducer from '../Slice/favoritesSlice';

export const store = configureStore({
    reducer: {
        counter : counterReducer ,
        user : userReducer ,
        favorites : favoritesReducer
    }
})