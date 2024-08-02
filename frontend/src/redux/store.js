import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './root-reducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * @description Middleware logger para o login
 * 
 */
const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['compraSlice']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**persistedReducer */
/**
 * @description Store com os reducers e middlewares utilizados
 */
const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
});

const persistor = persistStore(store);

export {store, persistor};