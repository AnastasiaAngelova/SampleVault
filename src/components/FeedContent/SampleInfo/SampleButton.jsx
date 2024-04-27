import "./SampleButton.css"
import { useState } from "react";



export function SampleButton({imageUrl, sampleUrl, onButtonClick}) {
    
    const [isPlaying, setIsPlaying] = useState(false); 

    let audio = new Audio("sample1.wav")



    const HandleButtonClick = () => {
        if (!isPlaying ){
           audio.play() 
           setIsPlaying(true)
        }
        else {
            console.log('PAUSE')
            audio.pause()
            setIsPlaying(false)
            
        }
        
        //setSelectedMenu(menuName);
    };

    return (
        
        //<img src={imageUrl} {imageUrl} className="song-image" onClick={() => {handleButtonClick('-')}
        
        <div className={
            isPlaying ? "song-image-button-active" : "song-image-button"
          } onClick={ HandleButtonClick} >
            <div className="song-image">
                <img src={imageUrl} alt={imageUrl} className="song-image" />
            </div>
        </div>
  
        // <div className="song-container">
        //     <div className="song-number">
        //         <span className="song-number-text">{number}</span>
        //     </div>
        //     <div className="song-info" >
        //     <img src={imageUrl} alt={title} className="song-image" />
        //         <div className="song-details">
        //             <h2 className="song-title">{title}</h2>
        //             <p className="song-description">{description}</p>
        //         </div>
        //     </div>
        //     <img
        //         src={star}
        //         alt="star01I114"
        //         className="song-control-img"
        //     />
        //     <img
        //         src={download}
        //         alt="download01I114"
        //         className="song-control-img"
        //     />
        // </div>
        // </div>
    );
  };
  