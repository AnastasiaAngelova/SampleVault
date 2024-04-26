import React from 'react';
import "./SampleItem.css"





export function SampleItem({
    number,
    title,
    icon_url,
    musical_instrument,
    genre,
    mood,
    tonality,
    tempo,}) {
    return (
        <div className="song-container">
            <div className="song-number">
                <span className="song-number-text">{number}</span>
            </div>
            <div className="song-info">
                <img src={icon_url} alt={title} className="song-image"/>
                <h2 className="song-title">{title}</h2>
                <h2 className="song-title">{musical_instrument}</h2>
                <h2 className="song-title">{genre}</h2>
                <h2 className="song-title">{mood}</h2>
                <h2 className="song-title">{tonality}</h2>
                <h2 className="song-title">{tempo}</h2>
                <img
                    src={'icons/star.svg'}
                    alt="star01I114"
                    className="song-control-img"
                />
                <img
                    src={'icons/download.svg'}
                    alt="download01I114"
                    className="song-control-img"
                />
            </div>
        </div>
    );
};

export default SampleItem;


/*
<div className="cardkit-stroke1artist">
            <div className="cardkit-frame18">
              <span className="cardkit-text02">1</span>
            </div>
            <div className="cardkit-frame20">
              <img
                // src={image}
                alt="IMAGE111145"
                className="cardkit-image11"
              />
              <div className="cardkit-frame19">
                <span className="cardkit-text03">
                  <span className="cardkit-text04">
                    <span>Ambient Electronica</span>
                    <br></br>
                    <span></span>
                  </span>
                  <span>Electronic</span>
                </span>
                <div className="cardkit-star01">
                  <img
                    src="./icons/star01i114-fzuj.svg"
                    alt="star01I114"
                    className="cardkit-star0101"
                  />
                </div>
                <div className="cardkit-download01">
                  <img
                    src="/icons/download01i114-ybo.svg"
                    alt="download01I114"
                    className="cardkit-download0101"
                  />
                </div>
              </div>
            </div>
          </div> */
