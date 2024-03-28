import {compose, legacy_createStore as createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { loggerMiddleware } from './middleware/logger';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);

// const thunkMiddleware = (store) => (next) => (action) => {
//     if(typeof(action) === 'function') {
//         action(dispatch)
//     }
// }

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

//Run saga Middleware
sagaMiddleware.run()

export const persistor = persistStore(store)