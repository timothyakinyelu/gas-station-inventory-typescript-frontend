/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { NonAuthRoutes, AuthRoutes, UserRoles } from './constants';
import Navbar from './reusables/navigation/Navbar';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import NewSale from './pages/NewSale';
import CheckResponse from './reusables/guards/checkResponse';
import AuthRoute from './reusables/guards/AuthRoute';
import { Unauthorized } from './pages/Unauthorized';

const Routes: React.FC = (): JSX.Element => {
    CheckResponse();
    const location = useLocation();

    return (
        <>
            {location.pathname === NonAuthRoutes.login ? (
                <Route exact path={NonAuthRoutes.login} component={Login} />
            ) : (
                <>
                    {location.pathname !== NonAuthRoutes.login && location.pathname !== NonAuthRoutes.unauthorized && (
                        <Navbar />
                    )}
                    <div className="appWrapper" style={{ minHeight: '429px' }}>
                        <div className="container-fluid">
                            <Switch>
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:company`}
                                    component={Dashboard}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:company${AuthRoutes.newsale}`}
                                    component={NewSale}
                                    requiredRoles={[String(UserRoles.user)]}
                                />
                                <Route
                                    path={`${AuthRoutes.dashboard}:company${NonAuthRoutes.unauthorized}`}
                                    component={Unauthorized}
                                />
                                {location.key === undefined && <Redirect to={NonAuthRoutes.login} />}
                            </Switch>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Routes;
