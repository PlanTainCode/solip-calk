import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popup: []
}

export const popupSlice = createSlice({
    name: 'popupData',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.popup.push(action.payload);
        },
        removeData: (state, action) => {
            state.popup = state.popup.filter((pop) => pop.uid !== action.payload)
        },
    }
})

export const {setData, removeData} = popupSlice.actions
export default popupSlice.reducer