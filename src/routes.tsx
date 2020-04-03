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
import Sidebar from './reusables/navigation/Sidebar';
import { useWindowResize } from './useWindowResize';
import Sales from './pages/sales/Sales';

const Routes: React.FC = (): JSX.Element => {
    CheckResponse();
    const location = useLocation();
    const { height } = useWindowResize();

    return (
        <>
            {location.pathname === NonAuthRoutes.login ? (
                <Route exact path={NonAuthRoutes.login} component={Login} />
            ) : (
                <>
                    {location.pathname !== NonAuthRoutes.login && location.pathname !== NonAuthRoutes.unauthorized && (
                        <Navbar />
                    )}
                    <Sidebar />
                    <div className="appWrapper" style={{ minHeight: height }}>
                        <div className="container-fluid">
                            <Switch>
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company`}
                                    component={Dashboard}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.sales}`}
                                    component={Sales}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.newsale}`}
                                    component={NewSale}
                                    requiredRoles={[String(UserRoles.user)]}
                                />
                                {location.key === undefined && <Redirect to={NonAuthRoutes.login} />}
                            </Switch>
                        </div>
                    </div>
                </>
            )}
            <Route path={`${AuthRoutes.dashboard}${NonAuthRoutes.unauthorized}`} component={Unauthorized} />
        </>
    );
};

export default Routes;
