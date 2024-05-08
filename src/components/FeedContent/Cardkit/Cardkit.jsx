import React from 'react'

import { Song } from '../Song/Song'
import './Cardkit.css'

const Cardkit = (props) => {
  if (!props.trendSounds || props.trendSounds.length === 0) {
    return (
        <div className="loader-container">
            <div className="loader22"></div>
        </div>
    );
  }
  
  return (
    <div className="cardkit-container">
        {console.log('tS ',props)}
        {props.trendSounds.map((sound, index) => (
                    <Song playlist={props} number={index+1}  {...sound}  />
                ))}
        
    </div>

    


)
}

export default Cardkit
