/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { endSession } from '../../redux/auth/actions';
import { Dropdown } from 'react-bootstrap';
import { User } from '../../redux/auth/types';
import { Link } from 'react-router-dom';
import navLogo from '../../images/inventreed.png';
import mobileLogo from '../../images/inTree.png';
import Logout from '../../components/auth/Logout';
import { AppState } from '../../redux';
import { connect } from 'react-redux';
import authHelper from '../../authHelper';
import PropTypes from 'prop-types';
import { useWindowResize } from '../../useWindowResize';
import '../../styles/navbar.css';
import { setSidebar } from '../../redux/central/actions';

interface NavbarProps {
    endSession: typeof endSession;
    setSidebar: typeof setSidebar;
    sidebarToggle: boolean;
    isLoggedIn: boolean;
    user: User;
}

const Navbar: React.FC<NavbarProps> = (props): JSX.Element => {
    const { endSession, isLoggedIn, user } = props;

    const { width } = useWindowResize();
    const [letter, setLetter] = useState<string | undefined>('');
    const [str, setStr] = useState<string | undefined>('');
    const [hidden, setHidden] = useState<boolean>(true);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        setStr(user.name);
        setLetter(str?.charAt(0));
    }, [isLoggedIn, user.name, str]);

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        setStr('');
        setLetter('');

        authHelper.remove();
        endSession({
            isLoggedIn: false,
            user: {},
        });
    };

    const toggleSidebar = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        e.preventDefault();
        setHidden(!hidden);

        props.setSidebar(!props.sidebarToggle);

        const side = document.getElementById('root');
        if (props.sidebarToggle === true) {
            side?.classList.add('show-sidebar');
        } else {
            side?.classList.remove('show-sidebar');
        }
    };

    return (
        <nav
            className="navbar col-lg-12 
            col-12 p-0 fixed-top 
            d-flex flex-row"
        >
            <div className="navbar-brand-wrapper d-flex justify-content-center">
                <div
                    className="navbar-brand-inner-wrapper 
                    d-flex justify-content-between 
                    align-items-center w-100"
                >
                    <Link to="{name: 'home'}" aria-label="logo" className="navbar-brand brand-logo">
                        {width > 990 ? (
                            <img src={navLogo} alt="logo" />
                        ) : (
                            <img className="mobile-logo" src={mobileLogo} alt="logo" />
                        )}
                    </Link>
                </div>
            </div>
            {width < 768 && (
                <div className="hamburger-menu">
                    {props.sidebarToggle ? (
                        <i className="mdi mdi-sort-variant" onClick={toggleSidebar}></i>
                    ) : (
                        <i className="mdi mdi-close" onClick={toggleSidebar}></i>
                    )}
                </div>
            )}
            <div
                className="navbar-menu-wrapper d-flex 
                align-items-center 
                justify-content-end"
            >
                <ul className="navbar-nav navbar-nav-right dropdown">
                    <li id="post-btn" className="nav-item">
                        <Dropdown>
                            <Dropdown.Toggle
                                className="account-btn dropdown-toggle"
                                variant="success"
                                id="dropdown-basic"
                            >
                                {str !== undefined && letter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right navbar-dropdown">
                                <Dropdown.Item>
                                    <i className="mdi mdi-settings text-primary"></i>
                                    {user.email}
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Logout handleLogOut={handleLogout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    endSession: PropTypes.any.isRequired,
    setSidebar: PropTypes.any,
    sidebarToggle: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state: AppState) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        sidebarToggle: state.center.sidebarToggle,
    };
};

export default connect(mapStateToProps, { endSession, setSidebar })(Navbar);
