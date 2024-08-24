import React, { useContext } from 'react';
import { TutorContext } from '../../Context/Context';
import './login.css'; // Assuming you have some CSS for styling

const Login = () => {
    const {
        loginData,
        setLoginData,
        isSignup,
        setIsSignup,
        error,
        setError,
        handleLogin,
        handleSignup,
        onChange
    } = useContext(TutorContext);

    const { email, password, confirmPassword, isTutor } = loginData;

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    return (
        <div className="container1">
            <div className="left-container">
                <div className="content1">
                    <h2>Welcome! Login or Register Here!</h2>
                    <button type="button" className="button1" onClick={toggleForm}>
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>

            <div className="right-container">
                {isSignup ? (
                    <div className="signup-form">
                        <h2>Register</h2>
                        <form onSubmit={handleSignup}>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email"
                                className="input"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                className="input"
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                placeholder="Confirm Password"
                                className="input"
                                required
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    name="isTutor"
                                    checked={isTutor}
                                    onChange={onChange}
                                />
                                Are you a Tutor?
                            </label>
                            <button type="submit" className="form-button">Submit</button>
                        </form>
                    </div>
                ) : (
                    <div className="signin-form">
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email"
                                className="input"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                className="input"
                                required
                            />
                            <button type="submit" className="form-button">Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
