import React, { useState } from "react";

import "./AuthPopup.css"


function AuthPopup() {
    function closePopup() {
        document.querySelector('.popup-container').style.display = 'none';
        window.history.back();
    }

    const redirectToLogin = () => {
        window.location.href = '/login';
    }

    const redirectToSignup = () => {
        window.location.href = '/signup';
    }

    return (
        <div className="popup-container">
            <div className="popup">
                <div className="popup-close-button" onClick={closePopup}>X</div>
                <div className="popup-header">
                    <h2>Авторизация</h2>
                </div>
                <div className="popup-body">
                    {/* <p>У вас есть аккаунт?</p> */}
                    <a className="btn btn-primary" onClick={redirectToLogin}>Войти</a>
                </div>
                <div className="popup-footer">
                    {/* <p>У вас нет аккаунта?</p> */}
                    <a className="btn btn-secondary" onClick={redirectToSignup}>Зарегистрироваться</a>
                </div>
            </div>
        </div>

    )
}

export default AuthPopup;