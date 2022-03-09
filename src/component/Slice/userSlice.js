import { createSlice } from "@reduxjs/toolkit";
import("@reduxjs/toolkit")
const initialState = {
    lang : 'us'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        savelangage : (state, action) => {
            
            state.lang = action.payload;
        }
    }
})

export const { savelangage } = userSlice.actions;
export default userSlice.reducer;