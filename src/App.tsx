import React from 'react';
import './App.css';
import Routes from './routes';
import Toasts from './toasts/Toasts';
import './styles/button.css';
import './styles/toast.css';

const App: React.FC = (): JSX.Element => {
    return (
        <>
            <Routes />
            <Toasts />
        </>
    );
};

export default App;
