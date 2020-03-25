import React from 'react';
import { useHistory } from 'react-router-dom';

export const Unauthorized = (): JSX.Element => {
    const history = useHistory();
    const goBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        history.goBack();
    };

    return (
        <div>
            <h2>You do not have access to this page!</h2>
            <span>
                Please click <button onClick={goBack}>Back</button> to return to your previous page!
            </span>
        </div>
    );
};
