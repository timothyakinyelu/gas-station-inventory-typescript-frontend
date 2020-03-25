import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { NonAuthRoutes, AuthRoutes, UserRoles } from './constants';
import Navbar from './reusables/navigation/Navbar';
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
            {location.pathname !== NonAuthRoutes.login && location.pathname !== NonAuthRoutes.unauthorized && (
                <Navbar />
            )}
            <Route path={NonAuthRoutes.login} component={Login} />
            <div className="main">
                <section className="switch-wrapper">
                    <div className="switch-wrapper-inner">
                        <div className="data-main-wrapper">
                            <main className="data-main">
                                <Switch>
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
                            </main>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
