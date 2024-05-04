import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LeftMenu from './components/LeftMenu/LeftMenu';
import { PlaylistProvider } from "./components/Player/PlaylistContext";
import AudioControler from "./components/Player/Player";
import Feed from './containers/Feed/Feed'
import SoundGen from './containers/SoundGen/SoundGen'
import SoundCollection from './containers/SoundCollection/SoundCollection';
import Login from './containers/Login/Login'
import Signup from './containers/Signup/Signup'

function App() {
    // Проверяем текущий путь
    const currentPath = window.location.pathname;

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
                <div className={"main-page"}>
                    <LeftMenu />
                    <Routes>
                        <Route exact path="/" element={<Navigate to="/feed" />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/generate" element={<SoundGen />} />
                        <Route path="/sound_collection" element={<SoundCollection />} />
                    </Routes>
                </div>
                <AudioControler />
            </Router>
        </PlaylistProvider>
    );
}

export default App;