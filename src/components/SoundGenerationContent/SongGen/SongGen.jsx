import React from 'react';
import "./SongGen.css"
// import {Cardkit2} from './Carkit2'

import { SampleButton } from '../../FeedContent/SampleInfo/SampleButton';
import { usePlaylist } from "../../Player/PlaylistContext"

export function SongGen(props) {
    const handleDownload = () => {
    fetch(props.audioSrc.split("?")[0])
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

  const { setPlaylist } = usePlaylist();

  // const updatePlaylist = (playlist) => {
  //   console.log("updating playlist", playlist);
  //   const newPlaylist = playlist; // Новый плейлист, который нужно передать
  //   setPlaylist(newPlaylist);
  // };

  const handleClick = (playlist, number) => {
    // Вызовите функцию myFunction с параметрами
    console.log('song_click')
    console.log('playlist',playlist )
    // props.onStartMusic(playlist, number);
    // updatePlaylist(playlist.sounds);
  };

  return (
    <div onClick={() => handleClick(props.playlist, props.number)} className="song-gen-container">
      <div className="song-gen-info" >
        <div className="song-gen-number">
        <span className="song-gen-number-text">{props.number}</span>
      </div>
        <SampleButton imageUrl={props.imageUrl}  />
        <div className="song-gen-details">
          <h2 className="song-gen-title">{props.title}</h2>
        </div>
      </div>

      {/* <Cardkit2 trendSounds={aiSounds}></Cardkit2>  */}
{/* fsaasffsasfafsasasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
        <img
          src={'icons/equalizer.svg'} 
          alt="equalizer"
          className='song-gen-equalizer'
        />
        <img
          src={'icons/star.svg'}
          alt="star"
          className="song-gen-control-img"
        />
        <img
          src={'icons/download.svg'}
          alt="download"
          className="song-gen-control-img"
          onClick={handleDownload}
        />
        
        <img 
          src={'icons/trash.svg'}
          alt="trash"
          className='song-gen-control-img'
        />
        <button className='song-gen-button-wrapper'>
          <img src="icons/share.svg" className='song-gen-button-img'/>
          <span className='song-gen-button-text'>Опубликовать</span>
        </button>
    </div>
  );
};