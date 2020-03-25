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
            style={{ position: 'relative', left: '50px', border: 'none' }}
        >
            Sign Out
        </button>
    );
};

Logout.propTypes = {
    handleLogOut: PropTypes.func.isRequired,
};

export default Logout;
