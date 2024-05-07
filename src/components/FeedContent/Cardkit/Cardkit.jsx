import React from 'react'

import { Song } from '../Song/Song'
import './Cardkit.css'

const Cardkit = (props) => {
  if (!props.trendSounds || props.trendSounds.length === 0) {
    return (
        <div className="cardkit-container">
            <div className="loader22"></div>
        </div>
    );
  }
//   console.log('logging '+process.env.PUBLIC_URL)
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
