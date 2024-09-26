import "./auth.css";
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import useLogin from '../../hooks/useLogin';
import URL from '../../config';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { showSuccess, showError } from '../Toast';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const { login } = useLogin();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || (isLogin && !password)) {
            showError('Please fill out all required fields.');
            return;
        }

        if (isLogin) {
            await login({ email, password });
        } else {
            await passwordForgot({ email });
        }
    }

    async function passwordForgot({ email }) {
        try {
            const res = await axios.post(`${URL}/user/forgotPassword`, { email });
            showSuccess(`Email sent to ${res.data} with the reset link.`);
        } catch (err) {
            showError(err.response?.data?.message || 'An error occurred.');
        }
    }

    function handleForgotPassword() {
        setIsLogin(!isLogin);
    }

    return (
        <>
            <Helmet>
                <title>Login - PDFConnect</title>
                <meta name="description" content="Login to your PDFConnect account and manage your documents seamlessly." />
                <meta name="keywords" content="Login, PDFConnect, document management, PDF editor" />
            </Helmet>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, {isLogin ? 'Log In' : 'Forgot Password'}</h1>
                        <p>{isLogin ? 'Hi, we are glad you are back. Please login.' : 'Enter the Email to send the reset Password'}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                id="email"
                                placeholder='Enter Your Email Address'
                            />
                        </div>

                        {isLogin && (
                            <div className="form_input">
                                <label htmlFor="password">Password</label>
                                <div className="two">
                                    <input
                                        type={!showPass ? "password" : "text"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        id="password"
                                        placeholder='Enter Your password'
                                    />
                                    <div className="showpass" onClick={() => setShowPass(!showPass)}>
                                        {!showPass ? "Show" : "Hide"}
                                    </div>
                                </div>
                            </div>
                        )}

                        <button className='btn'>{isLogin ? 'Login' : 'Send Mail'}</button>
                        <p>{isLogin ? `Can't remember Password? ` : `Already have an Account? `}<NavLink onClick={handleForgotPassword}>{isLogin ? 'Forgot Password' : 'Log In'}</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    );
}
