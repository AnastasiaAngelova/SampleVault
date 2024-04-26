// import React from 'react';
import React, { useState, useEffect } from 'react';
import "./Signup.css"

const Signup = () =>  {
    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Ubuntu:500' rel='stylesheet' type='text/css'/>
            <div className="login">
                <div className="login-header">
                    <h1>Login</h1>
                </div>
                <div className="login-form">
                    <h3>Username:</h3>
                    <input type="text" placeholder="Username"/><br/>
                    <h3>Password:</h3>
                    <input type="password" placeholder="Password"/>
                    <br/>
                    <input type="button" value="Login" className="login-button"/>
                    <br/>
                    <a className="sign-up">Sign Up!</a>
                    <br/>
                    <h6 className="no-access">Can't access your account?</h6>
                </div>
            </div>
            <div className="error-page">
                <div className="try-again">Error: Try again?</div>
            </div>
        </div>
    );
};

export default Signup;
