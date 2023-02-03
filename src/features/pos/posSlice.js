import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pos: []
}

export const posSlice = createSlice({
    name: 'posData',
    initialState,
    reducers: {
        setPos: (state, action) => {
            state.pos.push(action.payload);
        },
        removePos: (state, action) => {
            state.pos = state.pos.filter((po) => po.uid !== action.payload)
        },
        removeAllPos: (state, action) => {
            state.pos = state.pos.filter((po) => po.rodUid !== action.payload)
        },
    }
})

export const {setPos, removePos, removeAllPos} = posSlice.actions
export default posSlice.reducer