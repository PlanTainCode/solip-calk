import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {uniq} from 'lodash'


const initialState = {
    items: [],
}

export const getLiving = createAsyncThunk(
    'items/getLiving',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await axios.get('http://localhost:1337/api/living?populate=deep,10').then(({data}) => data.data)

        const newRes = {
            uid: res?.attributes.uid,
            tab: res?.attributes.Tab,
            content: {
            tabs: res?.attributes.Tabs.Element,
            services: res?.attributes.Services.Elementos.map((el) => el.Element),
            }
        }
        dispatch(removeItems(newRes.uid))
        dispatch(setItems(newRes))
    }
)

export const getBass = createAsyncThunk(
    'items/getBass',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await axios.get('http://localhost:1337/api/basroom?populate=deep,10').then(({data}) => data.data)

        const newRes = {
            uid: res?.attributes.uid,
            tab: res?.attributes.Tab,
            content: {
            tabs: res?.attributes.Tabs.Element,
            services: res?.attributes.Services.Elementos.map((el) => el.Element),
            }
        }
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
    extraReducers: {
        [getLiving.fulfilled]: () => console.log('fulfilled'),
        [getLiving.pending]: () => console.log('pending'),
        [getLiving.rejected]: () => console.log('rejected'),
        [getBass.fulfilled]: () => console.log('fulfilled'),
        [getBass.pending]: () => console.log('pending'),
        [getBass.rejected]: () => console.log('rejected'),
    }
})

export const { setItems, removeItems } = itemsSlice.actions;

export default itemsSlice.reducer;