import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Drop.css"


const Drop = ({onMenuClick}) => {
    const [isOpen, setOpen] = useState(false);

    const navigate = useNavigate(); 

    const handleMenuSelect = () => {
        setOpen(false);
        navigate('/generate');;
    };

    const handleMenuSelectUp = () => {
        setOpen(false);
        navigate('/upload');;
    };

    return (
        <div>
            <button className="menu-button" onClick={() => setOpen(!isOpen)}>
                <div className="left">
                <span className='txt'>Создать</span>
                </div>
                <div className="right">
                    <img className="chevron" src={"icons/chevron/chevron-down.svg"} alt="My SVG" />
                </div>
            </button>
            <nav className={`menu ${isOpen ? "active" : ""}`}>
                <ul className="menu-list">
                   <div className="new-buttons">
                        <button className="btn-top" onClick={handleMenuSelect}>
                            <span className='txt' style={{color:"black"}}>Новый звук с </span>
                            <span className='txt' style={{color:"red"}}>AI</span>
                        </button>
                        <button className="btn-bottom">
                        <spam className="txt" style={{color:"#478DF7"}}>Новый трек в редакторе</spam>
                        </button>
                   </div>
                   <div className="own-sound">
                     <button className="btn2">
                        <div className="bl">
                            <img className="chevron" src={"icons/add-circle.svg"} alt="My SVG" />
                        </div>
                        <div className="br">
                        <span className='txt' onClick={handleMenuSelectUp} style={{color:"black", textAlign:"center", alignItems:"center",justifyContent:"center"}}>Загрузить новый трек</span>
                        </div>
                     </button>
                   </div>
                </ul>
            </nav>
        </div>
    );
};

export default Drop;
