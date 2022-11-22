import { configureStore, combineReducers } from '@reduxjs/toolkit'
import paramSlice from '../features/params/paramSlice'
import popupSlice from '../features/popup/popupSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hwlSlice from '../features/hwl/hwlSlice'
import posSlice from '../features/pos/posSlice'
import contentSlice from '../features/content/contentSlice'


const rootReducer = combineReducers({
    params: paramSlice,
    popupData: popupSlice,
    hwlData: hwlSlice,
    posData: posSlice,
    contentData: contentSlice,
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
