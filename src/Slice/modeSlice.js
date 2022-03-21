import { createSlice } from "@reduxjs/toolkit";
import("@reduxjs/toolkit")
const initialState = {
    color : 'light'
}
export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers:{
        changemode : (state, action) => {
            state.color = action.payload;
        },
    }
})

export const {  changemode } = modeSlice.actions;
export default modeSlice.reducer;
