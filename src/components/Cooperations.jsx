
import React from 'react'
import ReactPlayer from 'react-player'
import walkBremerhaven from '/targetx-website/walkBremerhaven.mp4'; 



export default function Cooperations(){
    return (
        <div>
      <div className="content_container" id="main">
      <div className="content_main" id="content">
        <h1>Umsetzung</h1>
         
// Render a YouTube video player
// https://www.npmjs.com/package/react-player
// url='https://www.youtube.com/watch?v=LXb3EKWsInQ'

<div className='player-wrapper'>
<ReactPlayer
className='react-player'

url='/targetx-website/walkBremerhaven.mp4'
playing={true}
muted={true}
 
width='100%'
height='100%'
/>
     
</div>

 
      </div>
     
      <div id="sidebar" className="content_sub">
       
        
 
        <div className="clear"></div>
      </div>
      </div>
      </div>
    )
}