/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';
import "./mix.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(email, password);

        if (!email || !password) {
            toast.error('Fill form');
        }
        const formData = { email, password };

        await axios
            .post(`${config.userAPI}/login`, formData, {
                withCredentials: true
            })
            .then((data) => {
                navigate('/');
                console.log(data)
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log('Error signing in ', err.response.data)
            })

        // setEmail("");
        // setPassword("");
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showPass ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setShowPass(!showPass)}>
                                    {!showPass ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn'>Login</button>
                        <p>Don't have an Account? <NavLink to="/signup">Sign Up</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    )
}