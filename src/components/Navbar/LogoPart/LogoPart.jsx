import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LogoPart.css";


const LogoPart = () => {

    const navigate = useNavigate(); 

    const handleLogoSelect = () => {
        navigate('/feed');;
    };


    return (
        <div className="logo-section" onClick={handleLogoSelect}>
                <img src={"icons/logo.svg"} alt="logo" />
                <span className='logo-text'>
                    <strong>
                        Sample
                    </strong>
                    Vault
                </span>

        </div>
    );
};

export default LogoPart;
