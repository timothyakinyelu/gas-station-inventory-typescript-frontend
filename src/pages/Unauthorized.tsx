import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/unauthorized.css';

export const Unauthorized = (): JSX.Element => {
    const history = useHistory();
    const goBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        history.goBack();
    };

    return (
        <div className="container-fluid">
            <div className="unauthorized center">
                <div className="warning-icon-bar">
                    <span>!</span>
                </div>
                <h1>You do not have authorization access to view this page!</h1>
                <p>
                    Please click{' '}
                    <button className="back" onClick={goBack}>
                        Here
                    </button>{' '}
                    to return to your previous page!
                </p>
            </div>
        </div>
    );
};
