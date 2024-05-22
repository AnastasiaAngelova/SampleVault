import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Feed.css"
import Cardkit from '../../components/FeedContent/Cardkit/Cardkit';

const Feed = (props) => {
    const [userSounds, setUserSounds] = useState([]);
    const [aiSounds, setAISounds] = useState([]);
    const [user, setUser] = useState(null);

    const handleAuthUser = async () => {
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
                setUser(data);
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

            let likedData = [];
            if (user && user.id) {
                const likedResponse = await fetch('https://samplevault.ru/api/v1/liked-sounds', {
                    method: 'GET',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!likedResponse.ok) {
                    throw new Error('Ошибка при получении списка лайков');
                }

                likedData = await likedResponse.json();
                console.log('Liked sounds: ', likedData);
            }

            const userSounds = data.map(item => {
                return {
                    audioSrc: item.audio_url,
                    imageUrl: item.icon_url,
                    author: 'author',
                    duration: item.duration,
                    title: item.title,
                    cur_liked: likedData.some(likedItem => likedItem.id === item.id)
                };
            });

            const text1 = await response1.text();
            const data1 = JSON.parse(text1);

            const aiSounds = data1.map(item => {
                return {
                    audioSrc: item.audio_url,
                    imageUrl: item.icon_url,
                    author: 'author',
                    duration: item.duration,
                    title: item.title,
                    cur_liked: likedData.some(likedItem => likedItem.id === item.id)
                };
            });

            console.log(typeof (userSounds))

            setUserSounds(userSounds);
            setAISounds(aiSounds);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    useEffect(() => {
        handleAuthUser();
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
                    <img src="ImageSection/choose_ai_card.png" className='kirkorov' onClick={() => onMenuClick('/generate')}></img>
                    <img src="ImageSection/choose_sample_card.png" className='kirkorov' onClick={() => onMenuClick('/sound_collection')}></img>
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
