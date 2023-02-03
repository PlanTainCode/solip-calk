import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: 0,
}

export const paramSlice = createSlice({
    name: 'totalData',
    initialState,
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload
        },
        resetTotal: (state, action) => {
            state.total = 0
        }
    }
})

export const {setTotal, resetTotal} = paramSlice.actions
export default paramSlice.reducer