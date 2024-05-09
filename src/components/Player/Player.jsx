import "./Player.css";
import React,{useRef, useEffect} from 'react';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlaylist } from "./PlaylistContext";


export default function AudioControler() {
  const { playlist, trackIndex } = usePlaylist();
  const { setTrackIndex, setIsPlaying, isPlaying } = usePlaylist();
  const player = useRef();

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

  useEffect(() => {
    if (isPlaying) {
      player.current.audio.current.play();
    } else {
      player.current.audio.current.pause();
    }

  }, [isPlaying]);
  // console.log(playlist.length)
  if (playlist.length === 0) {
    return <div className="controler">
            <AudioPlayer
            style={{color: "white", background: "#FFFFFF" }}
            autoPlay
            onPlay={(e) => console.log("onPlay")}
            header={" "}
            showSkipControls={true}
            showJumpControls={false}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            onEnded={handleClickNext}
            loop={true}
            ref={player}
            />
            </div>;
  }

  return (
    <div className="controler">
{    console.log(playlist)}
{    console.log(playlist[trackIndex])}
{    console.log("SRC:  " + playlist[trackIndex].audioSrc)}
{    console.log("URL:  " + playlist[trackIndex].audioUrl)}

{/* }  {  console.log(playlist[0])} */}
  {/* {  console.log(playlist.sounds)} */}
  {/* {  console.log(playlist.sounds["0"])} */}

{/* {    console.log("1231321312")} */}
    <AudioPlayer
      style={{ borderRadius: "1rem", color: "black", background: "#FFFFFF" }}
      playing={isPlaying}
      src={playlist[trackIndex].audioSrc ? playlist[trackIndex].audioSrc : playlist[trackIndex].audioUrl}
      onCanPlay={false}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      showSkipControls={true}
      showJumpControls={false}
      header={`${playlist[trackIndex] ? playlist[trackIndex].title : playlist[trackIndex].title}`}
      onClickPrevious={handleClickPrevious}
      onClickNext={handleClickNext}
      onEnded={handleClickNext}
      ref={player}
      loop={true}
    />
    </div>
  );
}
