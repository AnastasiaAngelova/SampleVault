import React, { useState } from "react";

import "./AuthPopup.css"


function AuthPopup() {
    function closePopup() {
        document.querySelector('.popup-container').style.display = 'none';
        window.history.back();
    }

    return (
        <div className="popup-container">
            <div className="popup">
                <div className="popup-close-button" onClick={closePopup}>X</div>
                <div className="popup-header">
                    <h2>Авторизация</h2>
                </div>
                <div className="popup-body">
                    <p>У вас есть аккаунт?</p>
                    <a href="#" className="btn btn-primary">Войти</a>
                </div>
                <div className="popup-footer">
                    <p>У вас нет аккаунта?</p>
                    <a href="#" className="btn btn-secondary">Зарегистрироваться</a>
                </div>
            </div>
        </div>

    )
}

export default AuthPopup;
