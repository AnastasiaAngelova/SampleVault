import React from 'react'
import "./Song2.css"
import { usePlaylist } from "../Player/PlaylistContext"
// import { SampleButton } from '../SampleInfo/SampleButton'


export function Song2(props) {
  const handleDownload = () => {
  // console.log(props.audioUrl)
    fetch(props.audioUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${props.title}.wav`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => console.error('Ошибка при загрузке файла:', error));
  };


  // console.log(props)

  const { setPlaylist, setTrackIndex, setIsPlaying, isPlaying, trackIndex } = usePlaylist();

  const updatePlaylist = (playlist, trackIndex) => {
    const newPlaylist = playlist; // Новый плейлист, который нужно передать
    setPlaylist(newPlaylist);
    setTrackIndex(trackIndex);
  };

  const handleClick = (playlist, number) => {
    if (trackIndex === number - 1) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
      updatePlaylist(playlist.trendSounds, number - 1);
    }
  };

  return (
    <div onClick={() => handleClick(props.playlist, props.number)} className="song-container2">
      <div className="song-number">
        <span className="song-number-text">{props.number}</span>
      </div>
      <div className="song-info" >
      <img src={props.imageUrl} className='song-image'/>
        {/* <SampleButton imageUrl={props.imageUrl}  /> */}
        <div className="song-details">
          <h2 className="song-title">{props.title}</h2>
          <p className="song-description">{props.author}</p>
        </div>
        <img
          src={'icons/star.svg'}
          alt="star01I114"
          className="song--control-img"
          onClick={(e) => {
            e.stopPropagation(); 
            /* TODO LOGIC */
            }}
        />
        <img
          src={'icons/download.svg'}
          alt="download01I114"
          className="song--control-img"
          onClick={(e) => {
            e.stopPropagation(); 
            handleDownload();
            }}
        />
      </div>
    </div>
  );
};