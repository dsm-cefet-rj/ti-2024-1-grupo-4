import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './root-reducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: middleware,
});

const persistor = persistStore(store);

export {store, persistor};