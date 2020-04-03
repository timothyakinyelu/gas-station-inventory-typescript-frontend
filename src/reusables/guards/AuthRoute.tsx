/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { RouteComponentProps, Redirect, Route } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { NonAuthRoutes } from '../../constants';
import { User } from '../../redux/auth/types';

interface AuthRouteProps {
    component?: React.ComponentType<RouteComponentProps>;
    path: string;
    exact?: boolean;
    isLoggedIn: boolean;
    user: User;
    requiredRoles: any;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ path, requiredRoles, ...props }) => {
    const userRole = props.user.permission;
    const userHasRequiredRole = requiredRoles.includes(userRole);

    if (props.isLoggedIn && props.user !== {}) {
        if (userHasRequiredRole) {
            return <Route exact path={path} {...props} />;
        }
        return <Redirect to={{ pathname: `${NonAuthRoutes.unauthorized}` }} />;
    } else {
        return (
            <Redirect
                to={{
                    pathname: NonAuthRoutes.login,
                    state: { requestedPath: path },
                }}
            />
        );
    }
};

const mapStateToProps = (state: AppState) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    };
};
export default connect(mapStateToProps)(AuthRoute);
