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
        }
    }
})

export const {setPos, removePos} = posSlice.actions
export default posSlice.reducer