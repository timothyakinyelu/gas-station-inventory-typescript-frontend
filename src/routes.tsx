/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { NonAuthRoutes, AuthRoutes, UserRoles } from './constants';
import Navbar from './reusables/navigation/Navbar';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import NewSale from './pages/sales/NewSale';
import CheckResponse from './reusables/guards/checkResponse';
import AuthRoute from './reusables/guards/AuthRoute';
import { Unauthorized } from './pages/Unauthorized';
import Sidebar from './reusables/navigation/Sidebar';
import { useWindowResize } from './useWindowResize';
import Sales from './pages/sales/Sales';
import SalesDetail from './pages/sales/SalesDetail';
import Products from './pages/products/Products';
import Users from './pages/users/Users';
import Employees from './pages/employees/Employees';
import Stocks from './pages/stocks/Stocks';
import Supplies from './pages/supplies/Supplies';
import { Notfound } from './pages/Notfound';
import ExpensesDetail from './pages/expenses/ExpensesDetail';
import Expenses from './pages/expenses/Expenses';
import { AppState } from './redux';
import { AuthState } from './redux/auth/types';
import { connect } from 'react-redux';

interface RoutesProp {
    isLoggedIn: boolean;
}

const Routes: React.FC<RoutesProp> = (props): JSX.Element => {
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
                        <>
                            <Navbar />
                            <Sidebar />
                        </>
                    )}
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
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.sales}:stationID/:stationName`}
                                    component={Sales}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.sales}:stationID/:stationName/:codeID/:code/:date`}
                                    component={SalesDetail}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.products}`}
                                    component={Products}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.users}`}
                                    component={Users}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.employees}`}
                                    component={Employees}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.stocks}`}
                                    component={Stocks}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.stocks}:stationID/:stationName`}
                                    component={Stocks}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.supplies}`}
                                    component={Supplies}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.supplies}:stationID/:stationName`}
                                    component={Supplies}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.expenses}`}
                                    component={Expenses}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.expenses}:stationID/:stationName`}
                                    component={Expenses}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company${AuthRoutes.expenses}:stationID/:stationName/:date`}
                                    component={ExpensesDetail}
                                    requiredRoles={[String(UserRoles.admin)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company/:stationID/:station${AuthRoutes.newsale}`}
                                    component={NewSale}
                                    requiredRoles={[String(UserRoles.user)]}
                                />
                                <AuthRoute
                                    exact
                                    path={`${AuthRoutes.dashboard}:companyID/:company/:stationID/:station${AuthRoutes.newsale}:codeID/:codeName`}
                                    component={NewSale}
                                    requiredRoles={[String(UserRoles.user)]}
                                />
                                <Route path={`${NonAuthRoutes.unauthorized}`} component={Unauthorized} />
                                {props.isLoggedIn ? (
                                    <Route component={Notfound} />
                                ) : (
                                    <Redirect to={NonAuthRoutes.login} />
                                )}
                                {/* {location.key === undefined && <Redirect to={`${NonAuthRoutes.unauthorized}`} />} */}
                            </Switch>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state: AppState): AuthState => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
});

export default connect(mapStateToProps)(Routes);
