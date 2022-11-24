import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as BossRouter} from 'react-router-dom';
import {store, persistor} from './store/store'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { items } from './db';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App items={items} />
        </PersistGate>
    </Provider>
);