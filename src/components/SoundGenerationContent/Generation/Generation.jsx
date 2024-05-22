import React, { useState } from 'react';
import "./Generation.css"
import Dropdown from './Dropdown/Dropdown';
import DragDrop from '../../DragDrop/DragDrop';

const Generation = ({ onGenerate }) => {
    const [generationMethod, setGenerationMethod] = useState("option1"); // Состояние для хранения выбранного метода генерации
    const [inputText, setInputText] = useState('');
    const [leftValue, setLeftValue] = useState('');
    const [rightValue, setRightValue] = useState('');

    const handleLeftChange = (e) => {
        const newValue = parseInt(e.target.value, 10) || 0;
        setLeftValue(Math.max(0, Math.min(20, newValue)).toString());
      };
      
      const handleRightChange = (e) => {
        const newValue = parseInt(e.target.value, 10) || 0;
        setRightValue(Math.max(0, Math.min(60, newValue)).toString());
      };


    // Обработчик изменения значения в выпадающем списке
    const handleDropdownChange = (selectedValue) => {
        setGenerationMethod(selectedValue);
        setInputText('');
    };

    // Функция для получения содержимого поля ввода в зависимости от выбранного метода генерации
    const getPlaceholderText = () => {
        switch (generationMethod) {
            case "option1":
                return (

                    <textarea
                        type="text"
                        className='generation-input'
                        value={inputText}
                        placeholder="Напиши что бы ты хотел услышать..."
                        onChange={(e) => setInputText(e.target.value)}
                    />
                );
            case "option2":
                const img_types = ["JPG", "PNG", "GIF"];
                return (
                    <DragDrop
                        fileTypes={img_types}
                        label="Выберите или перетащите сюда изображение"
                        pathtoicon={"icons/images-light.svg"}
                        alt={"images-light"}
                        set_file_var={setInputText}
                    />
                );
            case "option3":
                const audio_types = ["WAV", "MP3"];
                return (
                    <DragDrop
                        fileTypes={audio_types}
                        label="Выберите или перетащите сюда аудиофайл"
                        pathtoicon={"icons/icon-park-outline.svg"}
                        alt={"icon-park-outline"}
                        set_file_var={setInputText}
                    />);
        }
    };

    return (
        <div className='generation-container'>
            <div className='generation-input-frame'>
                <div className='generation-input-title-wrapper'>
                    <div className='generation-input-title-text'>
                        Сгенерировать звук by
                    </div>
                    <div className="generation-input-logo-section">
                        <img src={"icons/logo.svg"} alt="logo" />
                        <span className='generation-input-logo-text'>
                            <strong>
                                Sample
                            </strong>
                            Vault
                        </span>
                    </div>
                </div>
                {getPlaceholderText()}
            </div>
            <div className='generation-right-frame'>
                <div className='generation-right-top-wrapper'>
                    <div className='generation-right-top-text'>
                        <div className='generation-right-top-text-left-wrapper'>
                            <span className='generation-right-top-text-left'>Способ генерации</span>
                        </div>
                        <div className='generation-right-top-text-right-wrapper'>
                            <span className='generation-right-top-text-right'>Длительность</span>
                        </div>
                    </div>
                    <div className='generation-right-top-pick-wrapper'>
                        <Dropdown onChange={handleDropdownChange} />
                        <div className='generation-duration'>
                            <input type="text"
                                className='generation-duration-left-text'
                                placeholder="05"
                                maxlength="2"
                                value={leftValue}
                                onChange={handleLeftChange}
                            />
                            <div className='generation-duration-text'>:</div>
                            <input type="text"
                                className='generation-duration-right-text'
                                placeholder="00"
                                maxlength="2"
                                value={rightValue}
                                onChange={handleRightChange}
                            />

                        </div>
                    </div>
                </div>
                <button className='generation-button' onClick={() => {
                                                                const durationInSeconds = `${leftValue}.${rightValue}`;
                                                                onGenerate(inputText, durationInSeconds, generationMethod);
                                                                
                                                                }}>
                                                            Сгенерировать звук 
                </button>
            </div>
        </div>

    );
};

export default Generation;
