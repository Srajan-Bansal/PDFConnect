import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from './Iconss';

export default function NavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <nav className='navbar'>
                <div className='nav-container'>
                    <NavLink
                        exact
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
                                exact
                                to='/'
                                className='nav-links'
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink
                                exact
                                to='/login'
                                className='nav-links'
                                onClick={handleClick}
                            >
                                Log in
                            </NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink
                                exact
                                to='/signup'
                                className='nav-links'
                                onClick={handleClick}
                            >
                                Sign up
                            </NavLink>
                        </li>
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
