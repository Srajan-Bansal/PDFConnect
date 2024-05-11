import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useContextAPI } from '../context/ContextAPI';
import useLogout from '../hooks/useLogout';

import './NavBar.css';
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from './Iconss';

export default function NavBar() {
    const [click, setClick] = useState(false);
    const { authUser } = useContextAPI();
    const { logout } = useLogout();

    const handleClick = () => setClick(!click);

    async function handleLogout() {
        await logout();
    }

    return (
        <>
            <nav className='navbar'>
                <div className='nav-container'>
                    <NavLink
                        exact="true"
                        to='/'
                        className='nav-logo'
                    >
                        <span>File Extractor</span>
                        {/* <i className="fas fa-code"></i> */}
                        <span className='icon'>
                            <CodeIcon />
                        </span>
                    </NavLink>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <NavLink
                                exact="true"
                                to='/'
                                className='nav-links'
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>

                        {
                            authUser ? (
                                <li className='nav-item'>
                                    <NavLink
                                        exact="true"
                                        to='/'
                                        className='nav-links'
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </NavLink>
                                </li>
                            ) : (
                                <>
                                    <li className='nav-item'>
                                        <NavLink
                                            exact="true"
                                            to='/login'
                                            className='nav-links'
                                            onClick={handleClick}
                                        >
                                            Log in
                                        </NavLink>
                                    </li>

                                    <li className='nav-item'>
                                        <NavLink
                                            exact="true"
                                            to='/signup'
                                            className='nav-links'
                                            onClick={handleClick}
                                        >
                                            Sign up
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }


                    </ul>

                    {/* For Mobile */}
                    <div className="nav-icon" onClick={handleClick}>
                        {/* // <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

                        {click ? (
                            <span className="icon">
                                <HamburgetMenuOpen />{" "}
                            </span>
                        ) : (
                            <span className="icon">
                                <HamburgetMenuClose />
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
