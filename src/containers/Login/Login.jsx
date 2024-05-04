// import React from 'react';
import React, { useState, useEffect } from 'react';
import "./Login.css"
import {NavLink, useNavigate} from "react-router-dom";

const Login = () =>  {
    const redirectToSignup = () => {
        window.location.href = '/signup';
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState(false);
    const [usernameColor, setUsernameColor] = useState("");
    const [passwordColor, setPasswordColor] = useState("");


    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = async () => {
        try {
            setLoginError(false);
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

            const response = await fetch('https://samplevault.ru/api/v1/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                console.log("Login successful!");
            }

            console.log('login status: ', response.status)

            if (response.status === 201) {
                window.location.href = '/';
            }
            if (response.status === 404) {
                setLoginError(true);
                setUsernameColor("red");
                setPasswordColor("red");
            }

        } catch (error) {
            console.log("login catch error: ", error)
        }
    };

    return (
        <div className="container">
            <input type="checkbox" id="check"/>
            <div className="login form">
                <header>Войти</header>
                <form action="#">
                    <input type="username" placeholder="Введите логин" value={username}
                           onChange={(e) => setUsername(e.target.value)} style={{borderColor: usernameColor}}/>
                    <input type="password" placeholder="Введите пароль" value={password}
                           onChange={(e) => setPassword(e.target.value)} style={{borderColor: passwordColor}}/>
                    {loginError && <p style={{ color: "red" }}>Пароль или логин неверный</p>}
                    {usernameError && <p style={{ color: "red" }}>Логин должен состоять от 4 до 15 символов</p>}
                    {passwordError && <p style={{ color: "red" }}>Пароль должен состоять от 4 до 15 символов</p>}
                    <input type="button" onClick={handleLogin} className="button" value="Войти"/>
                </form>
                <div className="signup">
                    <span className="signup">Нет аккаунта?
                        <label onClick={redirectToSignup}>Зарегистрироваться</label>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
