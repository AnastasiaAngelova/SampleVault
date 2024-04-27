import React from 'react';
import "./SampleItem.css"

export function SampleItem({ number, title, icon_url, musical_instrument, genre, mood, tonality, tempo }) {
  return (
    <div className="song--container">
      {/* <div className="song--number">
        <span>{number}</span>
      </div>
      <div className="song--info">
          <img src={icon_url} alt={title} className="song--image" />
          <h2 className="song--title">{title}</h2>
          <h2 className="song--title">{musical_instrument}</h2>
          <h2 className="song--title">{genre}</h2>
          <h2 className="song--title">{mood}</h2>
          <h2 className="song--title">{tonality}</h2>
          <h2 className="song--title">{tempo}</h2>
          <img src={'icons/star.svg'} alt="star01I114" className="song--control-img" />
          <img src={'icons/download.svg'} alt="download01I114" className="song--control-img" />
        </div> */}
      </div>
  );
};

export default SampleItem;