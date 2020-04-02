/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { AuthReducer } from './auth/reducers';
import thunkMiddleware from 'redux-thunk';
import { DashboardReducer } from './dashboard/reducers';
import { ToastReducer } from './toast/reducers';
import { CentralReducer } from './central/reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    auth: AuthReducer,
    metric: DashboardReducer,
    toast: ToastReducer,
    center: CentralReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(middleWareEnhancer));

    return store;
}
