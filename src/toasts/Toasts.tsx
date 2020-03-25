import React from 'react';
import { connect } from 'react-redux';
import { removeToast } from '../redux/toast/actions';
import { Toast, ToastState } from '../redux/toast/types';
import NewToast from './NewToast';
import { AppState } from '../redux';
import PropTypes from 'prop-types';

interface ToastProps {
    removeToast: typeof removeToast;
    toasts: Toast[];
}

const Toasts: React.FC<ToastProps> = (props) => {
    const defaultOptions = {
        color: 'rgb(255, 146, 74)',
    };

    const handleClick = (id: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        props.removeToast(id);
    };

    return (
        <ul className="toasts" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="5">
            {props.toasts.map((toast) => {
                const { id } = toast;
                return (
                    <NewToast
                        {...toast}
                        key={id}
                        message={toast.message}
                        color={defaultOptions.color}
                        handleClick={(event): void => handleClick(id, event)}
                    />
                );
            })}
        </ul>
    );
};

Toasts.propTypes = {
    removeToast: PropTypes.any.isRequired,
    toasts: PropTypes.array.isRequired,
};

const mapStateToProps = (state: AppState): ToastState => {
    return {
        toasts: state.toast.toasts,
    };
};

export default connect(mapStateToProps, { removeToast })(Toasts);
