import React, {useEffect, useState} from 'react';
import "./RightPart.css";
import Drop from "../Drop/Drop"
import CabinetDropdown from "../../CabinetDropdown/CabinetDropdown";
import { Link } from 'react-router-dom';
// import  from "../../DragDrop/DragDrop";


const RightPart = () => {
    const [user, setUser] = useState([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleAuthUser = async (event) => {
        try {
            const response = await fetch('https://samplevault.ru/api/v1/auth', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            });

            if (!response) {
                throw new Error('Ошибка при проверки авторизации');
            }

            const text = await response.text();
            if (text.trim() === '') {
                console.log('Ответ пустой');
                return;
            }

            const data = JSON.parse(text);
            console.log('пользователь: ', data);

            console.log("status code: ", response.status)
            if (response.status === 200) {
                const updatedUser = data.map(item => {
                    return {
                        id: item.id,
                        username: item.username,
                    };
                });
                setUser(updatedUser)
            }
            if (response.status === 401) {
                setUser({
                    id: '',
                    username: '',
                })
            }
        } catch (error) {
            console.error('Ошибка при проверки авторизации:', error);
        }
    };

    useEffect(() => {
        handleAuthUser();
    }, []);

    return (
        <div className="right-section">
            <Drop/>
            <div className="imgd" onClick={toggleDropdown}>
                {user.id == '' ? (<a
                        href="/auth_popup"
                        onClick={(e) => {
                            window.location.href = '/auth_popup';
                        }}
                        style={{ textDecoration: 'underline', color: 'crimson', font_family: 'Montserrat',
                        font_size: '20px',
                        font_weight: '500' }}
                        >
                        Войти
                    </a>
                ) : (
                    <>
                    <img
                        className="icon-right"
                        src="icons/not-anonim.svg"
                        alt="Авторизован"
                    />
                    <img
                        className="chevron"
                        src="icons/Chevron/chevron-down.svg"
                        alt="Иконка дропдавна"
                    />
                    {isDropdownOpen && <CabinetDropdown user={user} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default RightPart;