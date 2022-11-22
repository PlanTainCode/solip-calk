import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    high: null,
    length: null,
    width: null,
}

export const paramSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        setHigh: (state, action) => {
            state.high = action.payload
        },
        setWidth: (state, action) => {
            state.width = action.payload
        },
        setLength: (state, action) => {
            state.length = action.payload
        }
    }
})

export const {setHigh, setLength, setWidth} = paramSlice.actions
export default paramSlice.reducer