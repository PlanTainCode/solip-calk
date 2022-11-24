import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: null,
}

export const paramSlice = createSlice({
    name: 'totalData',
    initialState,
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload
        },
        resetTotal: (state, action) => {
            state.total = null
        }
    }
})

export const {setTotal, resetTotal} = paramSlice.actions
export default paramSlice.reducer