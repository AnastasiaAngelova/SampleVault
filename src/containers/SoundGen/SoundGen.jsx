import React, { useState, useEffect } from 'react';
import "./SoundGen.css"

import Generation from "../../components/SoundGenerationContent/Generation/Generation"
import SongGenKit from '../../components/SoundGenerationContent/SongKit/SongGenKit';

const SampleGen = () => {

    const [genSounds, setGenSounds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLoader, setShowLoader] = useState(false);


    const handleGetGenSounds = async () => {
        try {
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
            console.log(typeof (Sounds))

            setGenSounds(Sounds); // Обновляем состояние samples

        } catch (error) { // Устанавливаем состояние загрузки в false в случае ошибки
            console.error('Ошибка:', error);
        }

    };

    const handleGenerateSound = async (inputText, generationMethod) => {
        console.log(inputText);
        console.log(generationMethod);
        setShowLoader(true);
        setLoading(true); // Устанавливаем состояние загрузки в true при начале запроса
        try {

            const response = await fetch(`https://samplevault.ru/api/v1/sounds/generate_by_text`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                },
                body: {
                    "text": inputText
                },
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Ошибка при запросе на сервер');
            }

            setTimeout(async () => {
                setLoading(false);
                setShowLoader(false);

                const data = await response.json();
                console.log('Полученные данные:', data);

                setGenSounds(prevSounds => [
                    {
                        imageUrl: "SongImgs/song1.png",
                        title: "GeneratedSound",
                        audioUrl: data.audio_url
                    },
                    ...prevSounds
                ]);
            }, 5 * 1000);
        } catch (error) {
            setLoading(false);
            setShowLoader(false);
            console.error('Ошибка:', error);
        }
    };

    useEffect(() => {
        handleGetGenSounds();
    }, []);

    return (
        <div className="right-selection">
            <Generation onGenerate={handleGenerateSound} />

            {loading && <div className={`loader ${loading ? 'show' : ''}`}></div>}


            <div className='sample-gen-body-recent'>
                <div className='sample-gen-text-recent-wrapper'>
                    <span className='sample-gen-text-recent'>Мои последние сгенерированные звуки: </span>
                </div>
                {/* <SongGen imageUrl={"SongImgs/song1.png"} number={"1"} title={"I'm a song"}/> */}
                <SongGenKit sounds={genSounds} />

            </div>
        </div>
    );
};

export default SampleGen;
