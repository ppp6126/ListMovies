import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang : 'en'
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