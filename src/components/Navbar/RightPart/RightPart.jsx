import React, {useEffect, useState} from 'react';
import "./RightPart.css";
import Drop from "../Drop/Drop"


const RightPart = () => {
    const [user, setUser] = useState([]);

    const handleAuthUser = async (event) => {
        try {
            const response = await fetch('https://samplevault.ru/api/v1/auth', {
                method: 'GET',
                mode: 'cors'
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

    if (user.id === '') {
        return (
            <div className="right-section">
                <Drop/>
                <div className='ring'>
                    <img className='w' src={"icons/ring.svg"} alt="Не авторизован"/>
                </div>
                <div className="imgd">
                    <img className='icon-right' src={"icons/avatar.svg"} alt="Не авторизован"/>
                    <img className='chevron' src={"icons/chevron/chevron-down.svg"} alt="Не авторизован"/>
                </div>
            </div>
        );
    }
    if (user.id !== '') {
        return (
            <div className="right-section">
                <Drop/>
                <div className='ring'>
                    <img className='w' src={"icons/ring.svg"} alt="Авторизован"/>
                </div>
                <div className="imgd">
                    <img className='icon-right' src={"icons/avatar.svg"} alt="Авторизован"/>
                    <img className='chevron' src={"icons/chevron/chevron-down.svg"} alt="Авторизован"/>
                </div>
            </div>
        );
    }
};

export default RightPart;
