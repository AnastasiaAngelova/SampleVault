// import React from 'react';
import React, { useState, useEffect } from 'react';
import "./Signup.css"
import {Link, NavLink, useNavigate} from "react-router-dom";

const Signup = () =>  {
    const redirectToLogin = () => {
        window.location.href = '/login';
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [signupError, setSignupError] = useState(false);
    const [usernameColor, setUsernameColor] = useState("");
    const [passwordColor, setPasswordColor] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {
        try {
            setSignupError(false);
            setUsernameError(false);
            setPasswordError(false);
            setUsernameColor("#ddd");
            setPasswordColor("#ddd");

            if (username.length < 5 || username.length > 15) {
                setUsernameError(true);
                setUsernameColor("red");
                return
            }
            if (password.length < 5 || password.length > 15) {
                setPasswordError(true);
                setPasswordColor("red");
                return
            }

            const response = await fetch('https://samplevault.ru/api/v1/auth/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                console.log("Signup successful!");
            }

            console.log('signup status: ', response.status)

            if (response.status === 201) {
                window.location.href = '/';
            }
            if (response.status === 409) {
                setSignupError(true);
                setUsernameColor("red");
                setPasswordColor("red");
            }

        } catch (error) {
            console.log("signup catch error: ", error)
        }
    };

    return (
        <div className="container">
            <input type="checkbox" id="check"/>
            <div className="login form">
                <header>Зарегистрироваться</header>
                <form action="#">
                    <input type="username" placeholder="Введите логин" value={username}
                           onChange={(e) => setUsername(e.target.value)} style={{borderColor: usernameColor}}/>
                    <input type="password" placeholder="Введите пароль" value={password}
                           onChange={(e) => setPassword(e.target.value)} style={{borderColor: passwordColor}}/>
                    {signupError && <p style={{color: "red"}}>Такой логин уже существует</p>}
                    {usernameError && <p style={{ color: "red" }}>Логин должен состоять от 4 до 15 символов</p>}
                    {passwordError && <p style={{ color: "red" }}>Пароль должен состоять от 4 до 15 символов</p>}
                    <input type="button" onClick={handleSignup} className="button" value="Зарегистрироваться"/>
                </form>
                <div className="signup">
               <span className="signup">Уже имеете аккаунт?
                   <label onClick={redirectToLogin}>Войти</label>
                </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
