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

    const handleTryPref = async () => {
        if (file) {
                console.log('FI:E');
                const fileNameParts = file.name.split("_");
                console.log(fileNameParts)
                setStr1(fileNameParts[0] + "_" + fileNameParts[1])
                setStr2(fileNameParts[1])
                setStr3("House")
                setStr4("Upbeat")
                setStr5(fileNameParts[2])
                setStr6(fileNameParts[3])
        }
    }
    // Обработчик нажатия на кнопку "Загрузить аудиофайл"
    const handleUpload = async () => {
        console.log('is file?');
        if (!file) {
            console.log('no file');
            alert("Пожалуйста, выберите файл для загрузки.");
            return;
        }
        console.log('yes file');
        if (!str1){
            setStr1('Undefiend')
        }
        if (!str2){
            setStr2("Undefiend")
        }
        if (!str3){
            setStr3("Undefiend")
        }
        if (!str4){
            setStr4("Undefiend")
        }
        if (!str5){
            setStr5("Undefiend")
        }
        if (!str6){
            setStr6("Undefiend")
        }
        // if (!str1 || !str2 || !str3 || !str4 || !str5 || !str6){
        //     console.log('no fields');
        //     alert("Пожалуйста, заполните все поля.");
        //     return;
        // }

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
            formData.append('title', str1 ? str1 : "Undefiend")
            formData.append('musical_instrument', str2 ? str2 : "Undefiend")
            formData.append('genre', str3 ? str3 : "Undefiend")
            formData.append('mood', str4 ? str4 : "Undefiend")
            formData.append('tonality', str5 ? str5 : "Undefiend")
            formData.append('tempo', str6 ? str6 : "Undefiend")

            // const response = await axios.post('https://samplevault.ru/api/v1/sounds/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });

            const response = await fetch('https://samplevault.ru/api/v1/sounds/upload', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart'
                },
                body: formData
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
            <div className="file-uploader">
                <FileUploader 
                    handleChange={handleChange} 
                    name="file" 
                    types={["WAV", "MP3"]}
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
            <div className="container22">
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
                    <div class="text">Настроение</div>
                    <input type="text" value={str4} onChange={handleStr4} class="input" placeholder="Настроение"/>
                </div>
                <div class="row">
                    <div class="text">Тональность</div>
                    <input type="text" value={str5} onChange={handleStr5} class="input" placeholder="Тональность"/>
                </div>
                <div class="row">
                    <div class="text">Темп</div>
                    <input type="text" value={str6} onChange={handleStr6} class="input" placeholder="Темп"/>
                </div>
            </div>
            
            <button className='generation-button' onClick={handleUpload}>Загрузить аудиофайл</button>
            {/* <button onClick={handleTryPref}>ПРЕФАЕР ФАЙЛА</button> */}
            {/* <button onClick={handleutPack}></button> */}
        </div>
    )
};

export default Upload;
