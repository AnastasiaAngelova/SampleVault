// import React from 'react';
import React, { useState, useEffect } from 'react';
import "./SoundCollection.css"
import SampleItem from '../../components/SoundCollectionContent/Sample/SampleItem';
import Body1 from "../../components/SoundCollectionContent/Sample/SampleItem.css"

const SoundCollection = () =>  {
    const [samples, setSamples] = useState([]);


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        console.log('Выбранный файл:', file);

        const formData = new FormData();
        formData.append('audio', file);

        try {
            const response = await fetch('https://samplevault.ru/api/v1/sounds/upload', {
                method: 'POST',
                body: formData,
                mode: 'cors'
            });
            console.log(response)
            if (!response) {
                throw new Error('Ошибка при загрузке файла');
            }

            const data = await response.json();
            console.log('Файл успешно загружен:', data);
        } catch (error) {
            console.error('Ошибка:', error);
        }

        // TODO Сделать, чтобы sample с ответа добавлять в массив samples, а не ходить за целым списком
        handleGetAllSamples();
    };

    const handleGetAllSamples = async (event) => {
        try {
            const response = await fetch('https://samplevault.ru/api/v1/sounds', {
                method: 'GET',
                mode: 'cors'
            });

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

            const updatedSamples = data.map(item => {
                return {
                    icon_url: item.icon_url,
                    title: item.title,
                    musical_instrument: item.musical_instrument,
                    genre: item.genre,
                    mood: item.mood,
                    tonality: item.tonality,
                    tempo: item.tempo,
                };
            });

            setSamples(updatedSamples); // Обновляем состояние samples
        } catch (error) {
            console.error('Ошибка при получении списка сэмплов:', error);
        }
    };

    useEffect(() => {
        handleGetAllSamples();
    }, []);

    return (
        <div className="sounds-block_box">
            <div className="sound-properties-container">
                {samples.map((sample, index) => (
                    <SampleItem
                        number = {index+1}
                        icon_url = {sample.icon_url}
                        title = {sample.title}
                        musical_instrument = {sample.musical_instrument}
                        genre = {sample.genre}
                        mood = {sample.mood}
                        tonality = {sample.tonality}
                        tempo = {sample.tempo}
                    />
                ))}
            </div>
        </div>
    );
};

export default SoundCollection;
