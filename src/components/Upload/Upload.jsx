import React, { useState } from 'react';
import "./Upload.css"
import axios from 'axios'; // Импортируем библиотеку axios для выполнения HTTP-запросов
import { FileUploader } from "react-drag-drop-files";


const Upload = ({ onGenerate }) => {
    const [file, setFile] = useState(null);

    const [str1, setStr1] = useState('')
    const [str2, setStr2] = useState('')
    const [str3, setStr3] = useState('')
    const [str4, setStr4] = useState('')
    const [str5, setStr5] = useState('')
    const [str6, setStr6] = useState('')


    const handleStr1 = (event) => {
        // Обновляем состояние значения input
        setStr1(event.target.value);
    };
    const handleStr2 = (event) => {
        // Обновляем состояние значения input
        setStr2(event.target.value);
    };
    const handleStr3 = (event) => {
        // Обновляем состояние значения input
        setStr3(event.target.value);
    };
    const handleStr4 = (event) => {
        // Обновляем состояние значения input
        setStr4(event.target.value);
    };
    const handleStr5 = (event) => {
        // Обновляем состояние значения input
        setStr5(event.target.value);
    };
    const handleStr6 = (event) => {
        // Обновляем состояние значения input
        setStr6(event.target.value);
    };


    const handleChange = (file) => {
        console.log('handle');
        setFile(file);
        console.log(file);
      };

    // Обработчик нажатия на кнопку "Загрузить аудиофайл"
    const handleUpload = async () => {
        console.log('is file?');
        if (!file) {
            console.log('no file');
            alert("Пожалуйста, выберите файл для загрузки.");
            return;
        }
        console.log('yes file');

        // // Создаем объект FormData для отправки файла на сервер
        // const formData = new FormData();

        // formData.append('file', file);


        try {
            const formData = new FormData();
            formData.append('audio', file);
            // const json_data = {
            //     title: {str1},
            //     musical_instrument: {str2},
            //     genre: {str3},
            //     mood: {str4},
            //     tonality: {str5},
            //     tempo: {str6},
            // }
            formData.append('title', str1)
            formData.append('musical_instrument', str2)
            formData.append('genre', str3)
            formData.append('mood', str4)
            formData.append('tonality', str5)
            formData.append('tempo', str6)


            // formData.append('json_data', json.stringify({
            //     title: str1,
            //     musical_instrument: str2,
            //     genre: str3,
            //     mood: str4,
            //     tonality: str5,
            //     tempo: str6,
            // }));
            // Выполняем POST-запрос на сервер для загрузки файла
            const response = await axios.post('https://samplevault.ru/api/v1/sounds/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            setStr1('')
            setStr2('')
            setStr3('')
            setStr4('')
            setStr5('')
            setStr6('')
            handleChange(null)
            // Дополнительная логика после успешной загрузки файла, если необходимо
        } catch (error) {
            console.error('Error uploading file:', error);
            // Обработка ошибок при загрузке файла
        }
    };

    return (
        <div>
            {console.log("asdas")}
            <div>
                <FileUploader 
                    handleChange={handleChange} 
                    name="file" 
                    types={["WAV", "MP3"]}
                    // {...file ? (
                    //     {label: file.name}
                    // ) : (
                    //     {label: "Перетащите или вставьте сюда аудиофайл"}
                    // )}
                    dropMessageStyle={"icons/images-light.svg"}
                    pathtoicon={"icons/images-light.svg"}
                    alt={"icon-park-outline"}
                    children=
                    <div className={`generation-drag-drop-img-wrapper`}>
                        <div className='generation-drag-drop-img-text'>

                        {file ? (
                            file.name
                        ) : (
                            "Перетащите или вставьте сюда аудиофайл"
                        )}

                            {/* {"Перетащите или вставьте сюда аудиофайл"} */}
                        </div>
                        <div className='generation-drag-drop-img-icon'>
                            <img style={{width: "60px", margin: "0 0 0 0"}} src={"icons/add-circle.svg"} alt={"icon-park-outline"} />
                        </div>
                    </div>
                />




            </div>
            <div className="container">
            <div class="row">
                    <div class="text">Название</div>
                    <input type="text" value={str1} onChange={handleStr1} class="input" placeholder="Название"/>
                </div>
                <div class="row">
                    <div class="text">Инструмент</div>
                    <input type="text" value={str2} onChange={handleStr2} class="input" placeholder="Инструмент"/>
                </div>
                <div class="row">
                    <div class="text">Жанр</div>
                    <input type="text" value={str3} onChange={handleStr3} class="input" placeholder="Жанр"/>
                </div>
                <div class="row">
                    <div class="text">Настроеник</div>
                    <input type="text" value={str4} onChange={handleStr4} class="input" placeholder="Настроеник"/>
                </div>
                <div class="row">
                    <div class="text">Тональность</div>
                    <input type="text" value={str5} onChange={handleStr5} class="input" placeholder="Тональность"/>
                </div>
                <div class="row">
                    <div class="text">Темп</div>
                    <input type="text" value={str6} onChange={handleStr6} class="input" placeholder="Темп"/>
                </div>
                {/* <div class="row">
                    <div class="text">Тип</div>
                    <input type="text" class="input" placeholder="Тип"/>
                </div> */}
            </div>
            <button className='generation-button' onClick={handleUpload}>Загрузить аудиофайл</button>
        </div>
    )
};

export default Upload;