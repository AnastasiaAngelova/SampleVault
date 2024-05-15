import React from 'react'

import { Song2 } from '../Song2/Song2'
import './Cardkit2.css'

const Cardkit2 = (props) => {
  if (!props.trendSounds || props.trendSounds.length === 0) {
    return (
        <div className="loader-container2">
            Здесь будут ваши сгенерированные звуки
        </div>
    );
  }
  
  return (
    <div className="cardkit-container2">
        {console.log('CK2 ',props)}
        {props.trendSounds.map((sound, index) => (
                    <Song2 playlist={props} number={index+1}  {...sound}  />
                ))}
        
    </div>
)
}

export default Cardkit2
