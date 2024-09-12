import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContextAPI } from "./../../context/ContextAPI";
import { Helmet } from 'react-helmet-async';
import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Iconss";

export default function NavBar() {
    const [click, setClick] = useState(false);
    const { authUser } = useContextAPI();

    const handleClick = () => setClick(!click);

    return (
        <>
            <Helmet>
                <title>Navigation - PDFConnect</title>
                <meta name="description" content="Easily navigate through PDFConnect's features like editing, managing, and sharing documents." />
                <meta name="keywords" content="Navigation, PDFConnect, document editing, PDF management, file sharing" />
            </Helmet>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact="true" to="/" className="nav-logo">
                        <span>PDFConnect</span>
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
                                {authUser.user.photo && (
                                    <li className="nav-item">
                                        <div className="user-photo">
                                            <img
                                                src={authUser.user.photo}
                                                alt="User"
                                                className="user"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://i.pinimg.com/474x/5d/69/42/5d6942c6dff12bd3f960eb30c5fdd0f9.jpg';
                                                }}
                                            />
                                        </div>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <NavLink exact="true" to="/user/dashboard" className="nav-links">{authUser.user.name}</NavLink>
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
                    <div
                        className="nav-icon"
                        onClick={handleClick}
                        aria-label={click ? "Close menu" : "Open menu"}
                        aria-expanded={click}
                    >
                        {click ? (
                            <span className="icon">
                                <HamburgetMenuClose />
                            </span>
                        ) : (
                            <span>
                                <HamburgetMenuOpen />
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}