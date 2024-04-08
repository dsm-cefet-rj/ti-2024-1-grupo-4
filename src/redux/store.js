import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './root-reducer'

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);

const store = configureStore({
    reducer:rootReducer,
    middleware: middleware,
});

export default store;