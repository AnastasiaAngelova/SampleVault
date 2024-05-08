import React from 'react';
import "./SongTemplate.css"
import { usePlaylist } from "../Player/PlaylistContext"

export function SongTemplate(props, isDelete, isDownload, isCollection = null) {
  
  const { setPlaylist, setTrackIndex, setIsPlaying, isPlaying, playlist, trackIndex } = usePlaylist();

  const updatePlaylist = (playlist, trackIndex) => {
    const newPlaylist = playlist; // Новый плейлист, который нужно передать
    setPlaylist(newPlaylist);
    setTrackIndex(trackIndex);
  };

  const handleClick = (playlist, number) => {
    if (trackIndex === number - 1 && playlist.trendSounds === playlist.trendSounds) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
      updatePlaylist(playlist.trendSounds, number - 1);
    }
  };

  return (
    <div onClick={() => handleClick(props.playlist, props.number)} className="song-container">
      <div className="song-number">
        <span className="song-number-text">{props.number}</span>
      </div>
      <div className="song-info" >
        <img src={props.imageUrl} alt={props.imageUrl} className="song-image" />
        <div className="song-details">
          <h2 className="song-title">{props.title}</h2>
          <p className="song-description">{props.author}</p>
        </div>
        <img
          src={'icons/star.svg'}
          alt="star01I114"
          className="song-control-img"
        />
        
        {console.log("is", isDownload, isDelete)}

        {isDownload && <img
          src={'icons/download.svg'}
          alt="download01I114"
          className="song-control-img"
        />}

        {isDelete && <img 
        src={'icons/trash.svg'}
          alt="download01I114"
          className="song-control-img"
        />}
      </div>
    </div>
  );
};
