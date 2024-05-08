import React, { useState, useEffect } from 'react';
import "./SoundGen.css"

import Generation from "../../components/SoundGenerationContent/Generation/Generation"
import SongGenKit from '../../components/SoundGenerationContent/SongKit/SongGenKit';

const SampleGen = () => {

    const [genSounds, setGenSounds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLoader, setShowLoader] = useState(false);


    const handleGetGenSounds = async () => {try {
            const response = await fetch('https://samplevault.ru/api/v1/sounds/last_generated', {
                method: 'GET',
                mode: 'cors'
            });
        
            console.log(response)
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

            const Sounds = data.map(item => {
                return {
                    imageUrl: item.icon_url,
                    author: 'autor',
                    duration: item.duration,
                    title: item.title,
                    audioUrl: item.audio_url
                };
            });
            console.log(typeof(Sounds))

            setGenSounds(Sounds); // Обновляем состояние samples

        } catch (error) { // Устанавливаем состояние загрузки в false в случае ошибки
            console.error('Ошибка:', error);
        }

    };

    const handleGenerateSound = async () => {
        setShowLoader(true);
        setLoading(true); // Устанавливаем состояние загрузки в true при начале запроса
    try {
        try {
            const response = await fetch('https://samplevault.ru/api/v1/auth', {
                method: 'GET',
                credentials: 'include',
                mode: 'cors'
            });

            if (!response) {
                throw new Error('Ошибка при получении списка сэмплов');
            }

            if (response.status === 401) {
                window.location.href = '/auth_popup';
            }
        } catch (error) {
            console.error('Ошибка при получении списка сэмплов:', error);
        }

        // Задержка выполнения кода на 5 секунд
        setTimeout(async () => {
            const response = await fetch('https://samplevault.ru/api/v1/sounds/last_generated', {
                method: 'GET',
                mode: 'cors'
            });
            setLoading(false);
            setShowLoader(false);
            if (!response.ok) {
                throw new Error('Ошибка при запросе на сервер');
            }

            // Получение данных из ответа
            //const data = await response.json();

            // Обновление списка genSounds с новым сгенерированным треком
            setGenSounds(prevSounds => [{
                imageUrl: "SongImgs/song1.png",
                title: "GeneratedSound",
                audioSrc: 'https://samplevault.ru/api/v1/sounds/generate'
            }, ...prevSounds]);
        }, 5000); } catch (error) {
            setLoading(false);
            setShowLoader(false);
            console.error('Ошибка:', error);
        }
    };

    useEffect(() => {
        handleGetGenSounds();
    }, []);

    return (
        <div className="right-selection-gen">
            <Generation onGenerate={handleGenerateSound}/>

            {loading && <div className={`loader ${loading ? 'show' : ''}`}></div>}


            <div className='sample-gen-body-recent'>
                <div className='sample-gen-text-recent-wrapper'>
                    <span className='sample-gen-text-recent'>Мои последние сгенерированные звуки: </span>
                </div>
                
                <SongGenKit sounds={genSounds}/>

            </div>
        </div>
    );
};

export default SampleGen;
