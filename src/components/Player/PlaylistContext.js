import React, { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);

  // Функция для сброса индекса текущего трека
  const resetTrackIndex = () => {
    setTrackIndex(0);
  };

  return (
    <PlaylistContext.Provider value={{ playlist, setPlaylist, trackIndex, setTrackIndex, resetTrackIndex }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};