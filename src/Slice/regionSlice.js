import { createSlice } from "@reduxjs/toolkit";
import("@reduxjs/toolkit")
const initialState = {
    lang : 'us'
}

export const RegionSlice = createSlice({
    name: 'region',
    initialState,
    reducers:{
        saveRegion : (state, action) => {
            
            state.lang = action.payload;
        }
    }
})

export const { saveRegion } = RegionSlice.actions;
export default RegionSlice.reducer;