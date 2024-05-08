import React, {useEffect, useState} from 'react';
import "./RightPart.css";
import Drop from "../Drop/Drop"
import CabinetDropdown from "../../CabinetDropdown/CabinetDropdown";
import DragDrop from "../../DragDrop/DragDrop";


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
            <div className="imgd">
                <img className='icon-right' src={user.id !== '' ? "icons/not-anonim.svg" : "icons/anonim.svg"} alt={user.id !== '' ? "Авторизован" : "Не авторизован"}/>
                <img className='chevron' src={"icons/Chevron/chevron-down.svg"} onClick={toggleDropdown} alt="Иконка дропдавна"/>
                {isDropdownOpen && <CabinetDropdown
                    user={user}
                />}
            </div>
        </div>
    );
};

export default RightPart;
