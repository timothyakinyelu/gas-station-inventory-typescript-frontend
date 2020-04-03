import React from 'react';
import PropTypes from 'prop-types';

interface LogOutProps {
    handleLogOut: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Logout: React.FC<LogOutProps> = (props) => {
    return (
        <button
            onClick={props.handleLogOut}
            className="alt-out"
            style={{ position: 'relative', margin: 'auto', border: 'none' }}
        >
            <i className="mdi mdi-logout"></i>
            LogOut
        </button>
    );
};

Logout.propTypes = {
    handleLogOut: PropTypes.func.isRequired,
};

export default Logout;
