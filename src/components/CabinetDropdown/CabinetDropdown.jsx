import React, { useState, useEffect, useRef } from 'react';
import './CabinetDropdown.css';

const CabinetDropdown = () => {
    const [isOpen, setIsOpen] = useState(true); // Устанавливаем isOpen в true для отображения опций сразу
    const dropdownRef = useRef(null);

    const handleLogout = async (event) => {
        try {
            const response = await fetch('https://samplevault.ru/api/v1/auth/logout', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            });

            if (!response) {
                throw new Error('Ошибка при логауте');
            }

            console.log("status code: ", response.status)
            if (response.status === 200) {
                setIsOpen(false);
            }
            if (response.status === 401) {
                alert("Вы не авторизованы")
            }
        } catch (error) {
            console.error('Ошибка при логауте:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            {isOpen && (
                <div className="dropdown-options">
                    <div className="dropdown-option" onClick={handleLogout}>
                        <img className='dropdown-img' src={"icons/log-out.svg"} alt="Иконка выхода"/>
                        <div className='dropdown-txt'>Выход</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CabinetDropdown;
