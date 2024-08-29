import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContextAPI } from "./../../context/ContextAPI";

import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Iconss";

export default function NavBar() {
    const [click, setClick] = useState(false);
    const { authUser } = useContextAPI();

    const handleClick = () => setClick(!click);

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact="true" to="/" className="nav-logo">
                        <span>PDFConnect</span>
                        {/* <i className="fas fa-code"></i> */}
                        <span className="icon"><CodeIcon /></span>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink exact="true" to="/" className="nav-links" onClick={handleClick}>Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink exact="true" to={authUser ? "/docs" : "/login"} className="nav-links">Docs</NavLink>
                        </li>

                        {authUser ? (
                            <>
                                {/* <li className='nav-item'>
                                    <NavLink
                                        exact="true"
                                        to='/video'
                                        className='nav-links'
                                        onClick={handleClick}
                                    >
                                        Video
                                    </NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink exact="true" to="/user/dashboard" className="nav-links">{authUser.name}</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink exact="true" to="/login" className="nav-links" onClick={handleClick}>Login</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink exact="true" to="/signup" className="nav-links" onClick={handleClick}>Sign up</NavLink>
                                </li>
                            </>
                        )}
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
