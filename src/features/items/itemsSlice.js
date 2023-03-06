import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {uniq} from 'lodash'


const initialState = {
    items: [],
}

export const getEl = createAsyncThunk(
    'items/getEl',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await axios.get('https://solipadmin.tech/api/calks?populate=deep,10').then(({data}) => data.data)

        const newRes = res.map((r) => {
            const newItems = {
                uid: r?.attributes.uid,
                title: r?.attributes.title,
                image: r?.attributes.image.data.attributes,
                tab: r?.attributes.Tabs,
                services: r?.attributes.Services,
            }
            return newItems
        })
        

        dispatch(removeItems(newRes.uid))
        dispatch(setItems(newRes))
        
    }
)


export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items.push(action.payload);
        },
        removeItems: (state, action) => {
            state.items = state.items.filter((pop) => pop.uid !== action.payload)
        },
    },
    // extraReducers: {
    //     [getEl.fulfilled]: () => console.log('fulfilled'),
    //     [getEl.pending]: () => console.log('pending'),
    //     [getEl.rejected]: () => console.log('rejected'),
    // }
})

export const { setItems, removeItems } = itemsSlice.actions;

export default itemsSlice.reducer;