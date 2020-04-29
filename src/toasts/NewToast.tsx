import React from 'react';
import PropTypes from 'prop-types';

interface NewToastProps {
    message: string;
    color: string;
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const NewToast: React.FC<NewToastProps> = (props): JSX.Element => {
    return (
        <li className="toast" style={{ backgroundColor: props.color }}>
            <p className="toast__content">{props.message}</p>
            <button className="toast__dismiss" onClick={props.handleClick}>
                x
            </button>
        </li>
    );
};

NewToast.propTypes = {
    message: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default NewToast;
