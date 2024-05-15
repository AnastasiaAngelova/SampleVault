
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Feed.css"

import Cardkit from '../../components/FeedContent/Cardkit/Cardkit';

const Feed = (props) => {

    const [userSounds, setUserSounds] = useState([]);
    const [aiSounds, setAISounds] = useState([]);


    const handleGetSounds = async () => {
        try {
            console.log('trying to fetch')
            const response = await fetch('https://samplevault.ru/api/v1/sounds/random', {
                method: 'GET',
                mode: 'cors'
            });
            const response1 = await fetch('https://samplevault.ru/api/v1/sounds/random', {
                method: 'GET',
                mode: 'cors'
            });
            // console.log(response)
            if (!response) {
                throw new Error('Ошибка при получении списка сэмплов');
            }

            const text = await response.text();
            if (text.trim() === '') {
                console.log('Ответ пустой');
                return;
            }

            const data = JSON.parse(text);
            console.log('Сэмплы получены: ', data);

            if (data.length === 0) {
                console.log('Список сэмплов пуст');
            }

            const userSounds = data.map(item => {
                return {
                    audioSrc: item.audio_url,
                    imageUrl: item.icon_url,
                    author: 'author',
                    duration: item.duration,
                    title: item.title,
                };
            })

            const text1 = await response1.text();
            const data1 = JSON.parse(text1);

            const aiSounds = data1.map(item => {
                return {
                    audioSrc: item.audio_url,
                    imageUrl: item.icon_url,
                    author: 'author',
                    duration: item.duration,
                    title: item.title,
                };
            });


            console.log(typeof(userSounds))

            setUserSounds(userSounds); 
            setAISounds(aiSounds);
        } catch (error) {
            console.error('Ошибка:', error);
        }

    };

    useEffect(() => {
        handleGetSounds();
    }, []);

    const navigate = useNavigate(); 

    const onMenuClick = (route) => {
        navigate(route);
    };

    return (
        <div className="right-selection">
            <div className='container-new'>
                <span className='text-new'>Новое</span>

                <div className='cards'>
                    <div className='kirkorov' onClick={() => onMenuClick('/generate')}>
                        <span className='text-class'>Создание звуков вместе с AI</span>
                    </div>
                    
                </div>

            </div>
            <div className='container-new'>
                <span className='text-new'>В тренде</span>
                <div className="trend-block">
                    
                    <div className="trend-block_box">
                        <h1 className="container-text">Звуки пользователей</h1>
                        <Cardkit trendSounds={userSounds}></Cardkit>
                    </div>
                    <div className="trend-block_box">
                    <h1 className="container-text">Созданные совместно с AI</h1>
                        <Cardkit trendSounds={aiSounds}></Cardkit>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed;