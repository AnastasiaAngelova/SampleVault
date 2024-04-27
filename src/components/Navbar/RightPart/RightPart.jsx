import React from 'react';
import "./RightPart.css";
import Drop from "../Drop/Drop"


const RightPart = () => {
    return (
        <div className="right-section">
            <Drop />
            <div className='ring'>
                <img className='w' src={"icons/ring.svg"} alt="My SVG" />
            </div>
            <div className="imgd">
                <img className='icon-right' src={"icons/avatar.svg"} alt="My SVG" />
                <img className='chevron' src={"icons/chevron/chevron-down.svg"} alt="My SVG" />
            </div>
        </div>
    );
};

export default RightPart;
