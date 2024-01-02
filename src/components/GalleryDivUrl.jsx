import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// import walkBremerhaven from '/targetx-website/walkBremerhaven.mp4'; 

import PfeilLinks from '../assets/pfeil-links.svg';
import PfeilRechts from '../assets/pfeil-rechts.svg';
import Rechteck from '../assets/rechteck.svg';
import PfeilPlay from '../assets/pfeil-play.svg';



 

export default function GalleryDiv({ projectNumber, projectRange, sendUrl  }) {

  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  
   
   const [images, setImages ] = useState([
    '/targetx-interactive/Home-01.jpg', 
   '/targetx-interactive/Home-02.jpg', 
   '/targetx-interactive/Home-03.jpg', 
   '/targetx-interactive/Home-04.jpg'
  ])

  const url  =  "/targetx-interactive/data2.json"; 
// fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
      //  console.log(data);
        setData(data);
       
      
      } catch (error) {
        console.error(error);
      }
    };
  
    getData();
  }, [url]);
  

  // from json data file // projectNumber = 0 

 // let imagesNeu = data.length > 0 && data[`${projectNumber}`].gallery_image_names.map((image) => image);
 
 // const images = imagesNeu
  // console.log(images);


function loadImages(projectRange){
  useEffect(()=>{
    setImages(
      [`/targetx-interactive/Home-0${projectRange[0]}.jpg`, 
      `/targetx-interactive/Home-0${projectRange[1]}.jpg`, 
      `/targetx-interactive/Home-0${projectRange[2]}.jpg`, 
      `/targetx-interactive/Home-0${projectRange[3]}.jpg`]
  )
  })
 
}

 
 
  return (
    <div id="gallery1">
    
      {images.map((image,i) => (
      <div key={i}>
      <img src={image}  />
      </div>
     ))}
 
      <div id="layer1">
      </div>
      <div  className="gallery-3d">
       
       </div>
      <div className="gallery-menu">


      </div>

      {projectRange && projectRange.map((el,i)=> <span key={i}> {el} / </span>) }
  
  <button onClick={()=> loadImages(projectRange)}>click</button>
    </div>
  );
}
