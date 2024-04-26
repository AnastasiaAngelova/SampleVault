import React from 'react';
import "./Song.css"
import { usePlaylist } from "../../Player/PlaylistContext"
import { SampleButton } from '../SampleInfo/SampleButton';



export function Song(props) {
  
  const { setPlaylist } = usePlaylist();

  const updatePlaylist = (playlist) => {
    console.log("updating playlist", playlist);
    const newPlaylist = playlist; // Новый плейлист, который нужно передать
    setPlaylist(newPlaylist);
  };

  const handleClick = (playlist, number) => {
    // Вызовите функцию myFunction с параметрами
    console.log('song_click')
    console.log('playlist',playlist )
    // props.onStartMusic(playlist, number);
    updatePlaylist(playlist.trendSounds);
  };

  //console.log(props)
  return (
    

    <div onClick={() => handleClick(props.playlist, props.number)} className="song-container">
      <div className="song-number">
        <span className="song-number-text">{props.number}</span>
      </div>
      <div className="song-info" >
        <SampleButton imageUrl={props.imageUrl}  />
        {/* <img src={imageUrl} alt={title} className="song-image" /> */}
        <div className="song-details">
          <h2 className="song-title">{props.title}</h2>
          <p className="song-description">{props.author}</p>
        </div>
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
