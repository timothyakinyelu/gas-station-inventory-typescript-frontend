/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useWindowResize } from '../../useWindowResize';
import '../../styles/sidebar.css';
import { Link } from 'react-router-dom';
import { AuthRoutes, UserRoles } from '../../constants';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { AuthState, User } from '../../redux/auth/types';
import PropTypes from 'prop-types';

interface SidebarProps {
    user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
    const isAdmin = user.permission === UserRoles.admin;
    const isUser = user.permission === UserRoles.user;

    const company = user.company;
    const companyID = user.companyID;
    const station = user.station;
    const stationID = user.stationID;

    const { width } = useWindowResize();
    const toggleLink = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
        event.preventDefault();

        const stringID = event.currentTarget.dataset.id;
        const item: Element | null = document.body.querySelector(`li[data-id=${stringID}]`);
        const scrollSidebar = document.querySelector('.scroll-sidebar') as HTMLElement;

        item?.classList.toggle('active');

        if (item?.classList.contains('active')) {
            scrollSidebar.style.position = 'initial';
            if (width < 990) {
                item.getElementsByTagName('span')[0].style.display = 'initial';
            }
            if (item.getElementsByTagName('ul').length > 0) {
                item.getElementsByTagName('ul')[0].classList.add('in');
            }
        } else {
            scrollSidebar.style.position = 'relative';
            if (width < 990) {
                item!.getElementsByTagName('span')[0].style.display = '';
            }
            if (item!.getElementsByTagName('ul').length > 0) {
                item!.getElementsByTagName('ul')[0].classList.remove('in');
            }
        }
    };

    return (
        <aside className="left-sidebar">
            <div className="scroll-sidebar scroller">
                <nav className="sidebar-nav active">
                    <ul id="sidebarnav" className="in">
                        {isAdmin && (
                            <li className="listItem" onClick={toggleLink} data-id="navItem1">
                                <a className="has-arrow waves-effect waves-dark" href="#dashboard">
                                    <i className="mdi mdi-chart-line"></i>
                                    <span className="hide-menu">Dashboard</span>
                                </a>
                                <ul className="collapse">
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}`}
                                            className="nav-link"
                                        >
                                            Charts
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        <li className="listItem" onClick={toggleLink} data-id="navItem2">
                            <a className="has-arrow waves-effect waves-dark" href="#sales">
                                <i className="mdi mdi-cash-register"></i>
                                <span className="hide-menu">Sales</span>
                            </a>
                            <ul className="collapse">
                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.sales}`}
                                            className="nav-link"
                                        >
                                            All Sales
                                        </Link>
                                    </li>
                                )}
                                {isUser && (
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}/${stationID}/${station}${AuthRoutes.newsale}`}
                                            className="nav-link"
                                        >
                                            New Sale
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                        {isAdmin && (
                            <li className="listItem" onClick={toggleLink} data-id="navItem3">
                                <a className="has-arrow waves-effect waves-dark" href="#products">
                                    <i className="mdi mdi-gas-station-outline"></i>
                                    <span className="hide-menu">Products</span>
                                </a>
                                <ul className="collapse">
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.products}`}
                                            className="nav-link"
                                        >
                                            All Products
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {isAdmin && (
                            <li className="listItem" onClick={toggleLink} data-id="navItem4">
                                <a className="has-arrow waves-effect waves-dark" href="#employees">
                                    <i className="mdi mdi-account-group"></i>
                                    <span className="hide-menu">Employees</span>
                                </a>
                                <ul className="collapse">
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.employees}`}
                                            className="nav-link"
                                        >
                                            All Employees
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        <li className="listItem" onClick={toggleLink} data-id="navItem5">
                            <a className="has-arrow waves-effect waves-dark" href="#stocks">
                                <i className="mdi mdi-gauge"></i>
                                <span className="hide-menu">Stocks</span>
                            </a>
                            <ul className="collapse">
                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.stocks}`}
                                            className="nav-link"
                                        >
                                            All Stocks
                                        </Link>
                                    </li>
                                )}
                                {isUser && (
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}/${stationID}/${station}${AuthRoutes.newstock}`}
                                            className="nav-link"
                                        >
                                            New Stock
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                        <li className="listItem" onClick={toggleLink} data-id="navItem6">
                            <a className="has-arrow waves-effect waves-dark" href="#supplies">
                                <i className="mdi mdi-tanker-truck"></i>
                                <span className="hide-menu">Supplies</span>
                            </a>
                            <ul className="collapse">
                                {isAdmin && (
                                    <li>
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.supplies}`}
                                            className="nav-link"
                                        >
                                            All Supplies
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                        <li className="listItem" onClick={toggleLink} data-id="navItem7">
                            <a className="has-arrow waves-effect waves-dark" href="#expenses">
                                <i className="mdi mdi-cash-refund"></i>
                                <span className="hide-menu">Expenses</span>
                            </a>
                            <ul className="collapse">
                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.expenses}`}
                                            className="nav-link"
                                        >
                                            All Expenses
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                        {isAdmin && (
                            <li className="listItem" onClick={toggleLink} data-id="navItem8">
                                <a className="has-arrow waves-effect waves-dark" href="#settings">
                                    <i className="mdi mdi-cog-outline"></i>
                                    <span className="hide-menu">Settings</span>
                                </a>
                                <ul className="collapse">
                                    <li>
                                        <Link
                                            to={`${AuthRoutes.dashboard}${companyID}/${company}${AuthRoutes.users}`}
                                            className="nav-link"
                                        >
                                            {' '}
                                            All Users{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/settings/send-password-reset-link" className="nav-link">
                                            Reset User Passwords
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

Sidebar.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state: AppState): AuthState => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(Sidebar);
