import React from 'react'

import { Song } from '../Song/Song.jsx'
import './Cardkit.css'

const Cardkit = (props) => {

  //const trendSoundsArr = [...trendSounds]
  console.log('logging '+process.env.PUBLIC_URL)
  return (
    <div className="cardkit-container">
        {console.log('tS ',props)}
        {props.trendSounds.map((sound, index) => (
                    <Song playlist={props} number={index+1} {...sound} />
                ))}
        
    </div>
)
}

export default Cardkit
