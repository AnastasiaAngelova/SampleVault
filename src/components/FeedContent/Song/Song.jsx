import React, { useState } from 'react';
import "./Song.css"
import { usePlaylist } from "../../Player/PlaylistContext"
// import { SampleButton } from '../SampleInfo/SampleButton'


export function Song(props) {
  const [isLiked, setIsLiked] = useState(props.cur_liked);

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


  // console.log(props)
  const handleStar = async (e) => {
    e.stopPropagation();

    try {
      const endpoint = isLiked
        ? `https://samplevault.ru/api/v1/sounds/dislike/` + props.id
        : `https://samplevault.ru/api/v1/sounds/like/` + props.id;

      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при изменении состояния избранного');
      }

      if (response.status === 401) {
        window.location.href = '/auth_popup';
      }

      setIsLiked(!isLiked);
      console.log(`Track successfully ${isLiked ? 'removed from' : 'added to'} favorites`);
    } catch (error) {
      console.error(`Ошибка при ${isLiked ? 'удалении из' : 'добавлении в'} избранное:`, error);
    }
  };

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
    <div onClick={() => handleClick(props.playlist, props.number)} className="song-container">
      <div className="song-number">
        <span className="song-number-text">{props.number}</span>
      </div>
      <div className="song-info" >
        <img src={props.imageUrl} className='song-image' />
        {/* <SampleButton imageUrl={props.imageUrl}  /> */}
        <div className="song-details">
          <h2 className="song-title">{props.title}</h2>
          <p className="song-description">{props.author}</p>
        </div>
        <img
          src={isLiked ? 'icons/dark_star.svg' : 'icons/star.svg'}
          alt={isLiked ? 'dark_star' : 'star'}
          className="song--control-img"
          /*onClick={(e) => {
            e.stopPropagation();
          }}*/
          onClick={handleStar}
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
