import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hwl: []
}

export const hwlSlice = createSlice({
    name: 'hwlData',
    initialState,
    reducers: {
        setHwl: (state, action) => {
            state.hwl.push(action.payload);
        },
        removeHwl: (state, action) => {
            state.hwl = state.hwl.filter((hw) => hw.uid !== action.payload)
        }
    }
})

export const {setHwl, removeHwl} = hwlSlice.actions
export default hwlSlice.reducer