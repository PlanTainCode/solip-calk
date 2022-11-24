import { configureStore, combineReducers } from '@reduxjs/toolkit'
import popupSlice from '../features/popup/popupSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hwlSlice from '../features/hwl/hwlSlice'
import posSlice from '../features/pos/posSlice'
import contentSlice from '../features/content/contentSlice'
import totalSlice from '../features/total/totalSlice'
import itemsSlice from '../features/items/itemsSlice'


const rootReducer = combineReducers({
    items: itemsSlice,
    popupData: popupSlice,
    hwlData: hwlSlice,
    posData: posSlice,
    contentData: contentSlice,
    totalData: totalSlice,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 3,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)
