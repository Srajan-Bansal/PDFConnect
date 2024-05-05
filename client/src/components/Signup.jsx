import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mix.css';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleOnSubmit(e) {
        e.preventDefault();

        // console.log(name, email, password, confirmPassword);
        const formData = {
            name,
            email,
            password,
            passwordConfirm,
        };

        if (!name || !email || !password || !passwordConfirm) {
            toast.error('Fill form');
        }

        axios
            .post('http://localhost:8000/signup', formData, {
                withCredentials: true
            })
            .then((data) => console.log(data))
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log('Error signing in ', err.response.data)
            })

        // setName("");
        // setEmail("");
        // setPassword("");
        // setConfirmPassword("");
    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: 'center' }}>Please signup.</p>
                    </div>

                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                name='fname'
                                id='fname'
                                placeholder='Enter Your Name'
                            />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Address'
                            />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input
                                    type={!showPass ? 'password' : 'text'}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name='password'
                                    id='password'
                                    placeholder='Enter Your password'
                                    autoComplete='new-password'
                                />
                                <div
                                    className='showpass'
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {!showPass ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Confirm Password</label>
                            <div className='two'>
                                <input
                                    type={
                                        !showConfirmPassword
                                            ? 'password'
                                            : 'text'
                                    }
                                    value={passwordConfirm}
                                    onChange={(e) =>
                                        setPasswordConfirm(e.target.value)
                                    }
                                    name='showConfirmPassword'
                                    id='showConfirmPassword'
                                    placeholder='Confirm password'
                                    autoComplete='new-password'
                                />
                                <div
                                    className='showpass'
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {!showConfirmPassword ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>

                        <button className='btn'>Sign Up</button>
                        <p>
                            Already have an account?{' '}
                            <NavLink to='/login'>Log In</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
}
