// В вашем компоненте AudioControler

import "./Player.css";
import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlaylist } from "./PlaylistContext";

export default function AudioControler() {
  const { playlist } = usePlaylist();
  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };

    console.log("playlist", playlist);

  // Проверяем, задан ли плейлист. Если нет, возвращаем нективный плеер.
  if (!playlist || playlist.length === 0) {
    console.log("no playlist");
    return <div className="controler">
            <AudioPlayer
            style={{color: "white", background: "#FFFFFF" }}
            autoPlay
            onPlay={(e) => console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            onEnded={handleClickNext}
            />
            </div>;
  }

  // Если плейлист задан, рендерим плеер
  return (
    console.log("hereeeeeeeeeeeee"),
    console.log("playlist", playlist),
    console.log(trackIndex),
    <div className="controler">
      <AudioPlayer
        style={{ borderRadius: "1rem", color: "black", background: "#FFFFFF"  }}
        autoPlay
        src={playlist[trackIndex].audioSrc}
        onPlay={(e) => console.log("onPlay")}
        showSkipControls={true}
        showJumpControls={false}
        header={`${playlist[trackIndex].title}`}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
      />
    </div>
  );
}
