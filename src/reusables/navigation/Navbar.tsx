import React, { useEffect, useState } from 'react';
import { endSession } from '../../redux/auth/actions';
import { Dropdown } from 'react-bootstrap';
import { User, AuthState } from '../../redux/auth/types';
import { Link } from 'react-router-dom';
import navLogo from '../../images/logo.png';
import mobileLogo from '../../images/inTree.png';
import Logout from '../../components/auth/Logout';
import { AppState } from '../../redux';
import { connect } from 'react-redux';
import authHelper from '../../authHelper';
import PropTypes from 'prop-types';
import { useWindowResize } from '../../useWindowResize';
import '../../styles/navbar.css';
import { fetchStations, setStation } from '../../redux/central/actions';

interface NavbarProps {
    endSession: typeof endSession;
    fetchStations: typeof fetchStations;
    setStation: typeof setStation;
    isLoggedIn: boolean;
    user: User;
}

const Navbar: React.FC<NavbarProps> = ({ endSession, isLoggedIn, user }): JSX.Element => {
    const { width } = useWindowResize();
    const [letter, setLetter] = useState<string | undefined>('');
    const [str, setStr] = useState<string | undefined>('');
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
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    fetchStations: PropTypes.any,
    setStation: PropTypes.any,
};

const mapStateToProps = (state: AppState): AuthState => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, { endSession, fetchStations, setStation })(Navbar);
