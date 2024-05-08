import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LeftMenu from './components/LeftMenu/LeftMenu';
// import MainContent from './components/MainContent/MainContent';
// import Player from './components/Player/Player';
import {BrowserRouter} from "react-router-dom";
import { PlaylistProvider } from "./components/Player/PlaylistContext";
import AudioControler from "./components/Player/Player";
import Feed from './containers/Feed/Feed'
import SoundGen from './containers/SoundGen/SoundGen'
import SoundCollection from './containers/SoundCollection/SoundCollection';
import UploadPage from './containers/UploadPage/UploadPage';
import Login from './containers/Login/Login'
import Signup from './containers/Signup/Signup'
import AuthPopup from './components/AuthPopup/AuthPopup'

function App() {
  const currentPath = window.location.pathname;

  if (currentPath === "/auth_popup") {
    return (
        <PlaylistProvider>
          <BrowserRouter>
            <AuthPopup />
          </BrowserRouter>
        </PlaylistProvider>
    );
  }

  if (currentPath === "/signup") {
    return (
        <PlaylistProvider>
          <BrowserRouter>
            <Signup />
          </BrowserRouter>
        </PlaylistProvider>
    );
  }

  if (currentPath === "/login") {
    return (
        <PlaylistProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </PlaylistProvider>
    );
  }

  return (
    <PlaylistProvider>
    <Router>
        <Navbar />
          <div style={{paddingBottom: "114px"}} className={"main-page"}>
            <LeftMenu />
            <Routes>
              <Route exact path="/" element={<Navigate to="/feed" />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/generate" element={<SoundGen />} />
              <Route path="/sound_collection" element={<SoundCollection />} /> 
              <Route path="/upload" element={<UploadPage />} /> 

              {/*    <Route path="/tracks" element={TO BE} />
                  <Route path="/upload" element={TO BE} />
                  <Route path="/daw" element={TO BE} />
                  <Route path="/profile" element={TO BE} />
              */}
            </Routes> 
          </div>

        {/* <Player /> */}
        <AudioControler />

    </Router>
    </PlaylistProvider>
  );
}

export default App;