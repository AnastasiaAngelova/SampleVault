import React from 'react'

import { SongGen } from '../SongGen/SongGen'

import './SongGenKit.css'

const SongGenKit = (object) => {

  return (
    <div className="songgen-kit-container">
        {object.sounds.map((sound, index) => (
                    <SongGen 
                      playlist={object} number={index+1} {...sound}
                    />
                ))}
    </div>
)
}

export default SongGenKit