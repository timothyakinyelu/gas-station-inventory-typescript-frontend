import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/button.css';

interface AddButtonProps {
    handleShow: () => void;
}

export const AddButton = ({ handleShow }: AddButtonProps): JSX.Element => {
    return <i onClick={handleShow} className="mdi mdi-plus-circle addNew"></i>;
};

AddButton.propTypes = {
    handleShow: PropTypes.any,
};

export const SearchButton = (): JSX.Element => {
    return (
        <div>
            <div className="main-wrapper">
                <i className="material-icons">search</i>
            </div>
        </div>
    );
};

export const UserButton = (): JSX.Element => {
    return (
        <div>
            <div className="main-wrapper">
                <i className="material-icons">public</i>
            </div>
        </div>
    );
};

export const UnusedButtons = (): JSX.Element => {
    return (
        <div>
            <div className="main-wrapper">
                <i className="material-icons">attach_file</i>
                <i className="material-icons">settings</i>
                <i className="material-icons">refresh</i>
                <i className="material-icons">explore</i>
                <i className="material-icons">autorenew</i>
            </div>
        </div>
    );
};
