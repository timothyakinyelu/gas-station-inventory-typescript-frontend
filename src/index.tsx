/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux';
import { Provider } from 'react-redux';
import authHelper from './authHelper';
import { UPDATE_SESSION } from './redux/auth/types';
import authenticate from './api/authenticate';
import { useWindowResize } from './useWindowResize';
import center from './api/center';
import { FETCH_STATIONS } from './redux/central/types';

const store = configureStore();

const Root = (): JSX.Element => {
    const { width } = useWindowResize();

    const side = document.getElementById('root');

    if (width < 990) {
        side?.classList.add('mini-sidebar');
    } else {
        side?.classList.remove('mini-sidebar');
    }
    return (
        <Provider store={store}>
            <Router>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Router>
        </Provider>
    );
};

const render = () => {
    ReactDOM.render(<Root />, document.getElementById('root'));
};

const getStations = (id: string) => {
    center.getStations(id).then((res) => {
        store.dispatch({
            type: FETCH_STATIONS,
            payload: res.data,
        });
    });
};

const token = authHelper.get();
if (token) {
    authenticate
        .getUser()
        .then((res) => {
            store.dispatch({
                type: UPDATE_SESSION,
                payload: {
                    isLoggedIn: true,
                    user: res.data,
                },
            });

            const companyID = res.data.companyID;
            getStations(companyID);
            render();
        })
        .catch((err) => {
            if (err.response.data.message) {
                authHelper.remove();
                store.dispatch({
                    type: UPDATE_SESSION,
                    payload: {
                        isLoggedIn: false,
                        user: {},
                    },
                });
                render();
            }
        });
} else {
    render();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
