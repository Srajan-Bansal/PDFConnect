import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useSignup from '../../hooks/useSignup';

import './mix.css';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { signup } = useSignup();

    async function handleOnSubmit(e) {
        e.preventDefault();

        await signup({ name, email, password, passwordConfirm });
    }

    return (
        <>
            <Helmet>
                <title>Signup - PDFConnect</title>
                <meta name="description" content="Create a new PDFConnect account and start editing and managing your PDFs." />
                <meta name="keywords" content="Signup, PDFConnect, create account, document management" />
            </Helmet>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Welcome Back, Sign Up</h1>
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
                                style={{ width: '95%' }}
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
                                style={{ width: '95%' }}
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
