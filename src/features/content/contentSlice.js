import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    content: []
}

export const contentSlice = createSlice({
    name: 'contentData',
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.content.push(action.payload);
        },
        removeContent: (state, action) => {
            state.content = state.content.filter((con) => con.uid !== action.payload)
        },
    }
})

export const {setContent, removeContent} = contentSlice.actions
export default contentSlice.reducer