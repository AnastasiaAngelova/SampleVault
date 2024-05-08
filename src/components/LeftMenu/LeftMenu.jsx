import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./LeftMenu.css"


const LeftMenu = () => {

    const navigate = useNavigate(); 

    const onMenuClick = (route) => {
        navigate(route);
    };

    return (
        <div className="left-selection">
            <div className="left-selection_button" onClick={() => onMenuClick('/feed')}>
                <div className="left-selection_button_img">
                    <img src={"icons/note.svg"} alt="search" />
                </div>
                <span className="left-selection_txt">Лента</span>
            </div>
            <div className="left-selection_button" onClick={() => onMenuClick('/sound_collection')}>
                <div className="left-selection_button_img">
                    <img src={"icons/sounds.svg"} alt="search" />
                </div>
                <span className="left-selection_txt">Звуки</span>
            </div>
            
        </div>
    );
};

export default LeftMenu;

