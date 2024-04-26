import React from 'react'

import { SongTemplate } from '../../SongTemplate/SongTemplate'
import './Cardkit.css'

const Cardkit = (props) => {

  //const trendSoundsArr = [...trendSounds]
  console.log('logging '+process.env.PUBLIC_URL)
  return (
    <div className="cardkit-container">
        {console.log('tS ',props)}
        {props.trendSounds.map((sound, index) => (
                    <SongTemplate playlist={props} number={index+1}  {...sound} isDownload={1} isDelete={false}   />
                ))}
        
    </div>
)
}

export default Cardkit
