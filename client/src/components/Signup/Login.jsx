/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { NavLink } from "react-router-dom"
import useLogin from '../../hooks/useLogin';
import config from '../../config';

import "./mix.css"
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const { login } = useLogin();

    async function handleSubmit(e) {
        e.preventDefault();

        if (isLogin) {
            await login({ email, password });
        } else {
            await passwordForgot({ email });
        }
    }

    async function passwordForgot({ email }) {
        try {
            const res = await axios.post(`${config.userAPI}/forgotPassword`, { email });
            console.log(res);
            toast.success(`Email sent to ${res.data} with the reset link.`);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    function handleForgotPassword() {
        setIsLogin(!isLogin);
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, {isLogin ? 'Log In' : 'Forgot Password'}</h1>
                        <p>{isLogin ? 'Hi, we are you glad you are back. Please login.' : 'Enter the Email to send the reset Password'}</p>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        {isLogin ?
                            <div className="form_input">
                                <label htmlFor="password">Password</label>
                                <div className="two">
                                    <input type={!showPass ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='Enter Your password' />
                                    <div className="showpass" onClick={() => setShowPass(!showPass)}>
                                        {!showPass ? "Show" : "Hide"}
                                    </div>
                                </div>
                            </div> : null
                        }

                        <button className='btn'>{isLogin ? 'Login' : 'Send Mail'}</button>
                        <p>{isLogin ? `Can't remember Password? ` : `Already have an Account? `}<NavLink onClick={handleForgotPassword}>{isLogin ? 'Forgot Password' : 'Log In'}</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    )
}