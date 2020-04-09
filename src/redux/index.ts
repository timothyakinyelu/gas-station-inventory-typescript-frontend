/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { AuthReducer } from './auth/reducers';
import thunkMiddleware from 'redux-thunk';
import { DashboardReducer } from './dashboard/reducers';
import { ToastReducer } from './toast/reducers';
import { CentralReducer } from './central/reducers';
import { SalesReducer } from './sales/reducers';
import { ProductsReducer } from './products/reducers';
import { UsersReducer } from './users/reducers';
import { EmployeesReducer } from './employees/reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const appReducer = combineReducers({
    auth: AuthReducer,
    metric: DashboardReducer,
    toast: ToastReducer,
    center: CentralReducer,
    salesRoot: SalesReducer,
    productsRoot: ProductsReducer,
    usersRoot: UsersReducer,
    employeesRoot: EmployeesReducer,
});

const rootReducer = (state: any, actions: any) => {
    if (actions.type === 'END_SESSION') {
        state = undefined;
    }
    return appReducer(state, actions);
};

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(middleWareEnhancer));

    return store;
}
