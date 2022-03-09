import { createSlice } from "@reduxjs/toolkit";
import("@reduxjs/toolkit")
const initialState = {
    title : ['']
}
export const favoritesSlice = createSlice({

    name: 'favorites',
    initialState,
    reducers:{
        savefavorite : (state, action) => {
            state.title.push(action.payload)
        },
        unsavafavorite: (state, action) => {
            for(let i=0 ; i<state.title.length ; i++){
                if(state.title[i] === action.payload){
                    debugger
                    state.title.splice(i,1);
                    
                }
                console.log(state.title[i]);
            }
        }
    }
})

export const { savefavorite ,unsavafavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;