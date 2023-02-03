import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mussum: []
}

export const mussumSlice = createSlice({
    name: 'mussumData',
    initialState,
    reducers: {
        setMussum: (state, action) => {
                state.mussum.push(action.payload);
                

            
        },
        removeMussum: (state, action) => {
            // state.mussum = state.mussum.filter((mus) => mus !== action.payload)
            state.mussum = []
        },
    }
})

export const {setMussum, removeMussum} = mussumSlice.actions
export default mussumSlice.reducer