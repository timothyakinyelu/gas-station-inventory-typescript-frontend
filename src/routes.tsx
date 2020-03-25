import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { NonAuthRoutes, AuthRoutes, UserRoles } from './constants';
import { Navbar } from './reusables/navigation/Navbar';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import NewSale from './pages/NewSale';
import CheckResponse from './reusables/guards/checkResponse';
import AuthRoute from './reusables/guards/AuthRoute';
import { Unauthorized } from './pages/Unauthorized';

export const Routes = (): JSX.Element => {
    CheckResponse();
    const location = useLocation();
    return (
        <>
            {location.pathname !== '/login' && <Navbar />}
            <Switch>
                <Route path={NonAuthRoutes.login} component={Login} />
                <AuthRoute
                    exact
                    path={AuthRoutes.dashboard}
                    component={Dashboard}
                    requiredRoles={[String(UserRoles.admin)]}
                />
                <AuthRoute
                    exact
                    path={AuthRoutes.newsale}
                    component={NewSale}
                    requiredRoles={[String(UserRoles.user)]}
                />
                <Route path={NonAuthRoutes.unauthorized} component={Unauthorized} />
            </Switch>
        </>
    );
};
