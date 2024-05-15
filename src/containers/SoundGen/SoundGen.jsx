import React, { useState, useEffect } from 'react';
import "./SoundGen.css"

import Generation from "../../components/SoundGenerationContent/Generation/Generation"
import SongGenKit from '../../components/SoundGenerationContent/SongKit/SongGenKit'

import Cardkit2 from '../../components/Cardkit2/Cardkit2';


const SampleGen = () => {

    const [genSounds, setGenSounds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLoader, setShowLoader] = useState(false);


    const handleGetGenSounds = async () => {
        try {
            const response = await fetch('https://samplevault.ru/api/v1/sounds/last_generated', {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
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
                    author: 'author',
                    duration: item.duration,
                    title: item.title,
                    audioUrl: item.audio_url
                };
            });

            setGenSounds(Sounds); 

        } catch (error) { 
            console.error('Ошибка:', error);
        }

    };

    const handleGenerateSound = async (inputText, generationMethod) => {
        setShowLoader(true);
        setLoading(true); // Устанавливаем состояние загрузки в true при начале запроса
        console.log('generationMethod:', generationMethod);
        console.log('input filetext:', inputText);
    
        try {
            try {

                if (generationMethod == 'option1') {

                    const requestBody = {
                        text: inputText
                    };
                    const response = await fetch(`https://samplevault.ru/api/v1/sounds/generate_by_text`, {
                        body: JSON.stringify(requestBody),
                        method: 'POST',
                        credentials: 'include',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response) {
                        throw new Error('Ошибка при получении списка сэмплов');
                    }

                    if (response.status === 401) {
                        window.location.href = '/auth_popup';
                    }

                }

                if (generationMethod == 'option2') {
                    const requestBody = {
                        // image_url: inputText
                    };
                    
                    const response = await fetch(`https://samplevault.ru/api/v1/sounds/generate_by_image_url`, {
                        body: JSON.stringify(requestBody),
                        method: 'POST',
                        credentials: 'include',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response) {
                        throw new Error('Ошибка при получении списка сэмплов');
                    }

                    if (response.status === 401) {
                        window.location.href = '/auth_popup';
                    }

                }

                if (generationMethod == 'option3') {
                    const requestBody = {
                        // audio_url: inputText
                    };
                    const response = await fetch(`https://samplevault.ru/api/v1/sounds/generate_by_audio_url`, {
                        body: JSON.stringify(requestBody),
                        method: 'POST',
                        credentials: 'include',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response) {
                        throw new Error('Ошибка при получении списка сэмплов');
                    }

                    if (response.status === 401) {
                        window.location.href = '/auth_popup';
                    }

                }

                } catch (error) {
                    console.error('Ошибка при получении списка сэмплов:', error);
                } 

            
            const response = await fetch('https://samplevault.ru/api/v1/sounds/last_generated', {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            setLoading(false);
            
            setShowLoader(false);

            if (!response.ok) {
                throw new Error('Ошибка при запросе на сервер');
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

            handleGetGenSounds();

        } catch (error) {
            setLoading(false);
            setShowLoader(false);
            console.error('Ошибка:', error);
        }
    };

    useEffect(() => {
        handleGetGenSounds();
        setGenSounds();
    }, []);

    return (
        <div className="right-selection-gen">
            <Generation onGenerate={handleGenerateSound} />

            {loading && <div className={`loader ${loading ? 'show' : ''}`}></div>}

            <div className='sample-gen-body-recent'>
                <div className='sample-gen-text-recent-wrapper'>
                    <span className='sample-gen-text-recent'>Мои последние сгенерированные звуки: </span>
                </div>
                
                <Cardkit2 className="ck" trendSounds={genSounds}></Cardkit2>

            </div>
        </div>
    );
};

export default SampleGen;
