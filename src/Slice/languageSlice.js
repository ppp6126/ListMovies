import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language : 0
}
export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers:{
        savelangauge : (state, action) => {
            
            state.lang = action.payload;
        }
    }
})

export const { savelangauge } = languageSlice.actions;
export default languageSlice.reducer;