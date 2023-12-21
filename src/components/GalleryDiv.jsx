import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// import walkBremerhaven from '/targetx-website/walkBremerhaven.mp4'; 

import PfeilLinks from '../assets/pfeil-links.svg';
import PfeilRechts from '../assets/pfeil-rechts.svg';
import Rechteck from '../assets/rechteck.svg';
import PfeilPlay from '../assets/pfeil-play.svg';


let timerID = 0;
// let tempo = 100

export default function GalleryDiv({ projectNumber, projectRange  }) {

  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [tempo, setTempo] = useState(400)
  const timerRef = useRef(null); // Use useRef to create a mutable reference
  const [fullScreen,setFullScreen] = useState(false)
   const [isFullScreen, setIsFullScreen] = useState(false);
  const[galleryPlaying, setGalleryPlaying] = useState(true);


  function checkRange(projectRange){
    console.log(projectRange)
  }

 

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
     //   console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getData();
  }, [url]);
  

  // from json data file
  // const imagesNeu = data.length > 0 && data[`${projectNumber}`].gallery_image_names.map((image) => image);
 const images = data.length > 0 && data[`${projectNumber}`].gallery_image_names.map((image) => image);
 /*
 let images = [];

  for(let i=0 ; i < imagesNeu.length; i++){
     const tempVar = projectRange[i]
    images[i] = imagesNeu[tempVar]
    images.push(images[i])
  }
*/
  /// console.log(images)

  if (images.length === 0) {
    return null; // or render a loading indicator
  }
 

  useEffect(() => {
    timerID += 1;

    timerRef.current = setInterval(() => {
      setCounter((currentCounter) => {
        if (currentCounter >= 10 * images.length - 1) {
          setCounter(0);
          timerID = 0;
        }
        if ((currentCounter - 8) % 10 === 0) {
          imageBlend(0);
        }
        if (currentCounter % 10 === 0) {
          imageBlend(1);
        }
        return currentCounter + 1;
      });
    }, tempo);

    return () => {
      clearInterval(timerRef.current); // Use timerRef.current to clear the interval
    };
  }, []);

  function nextImageForward(nr) {
    setCounter((currentCounter) => {
      // if more than images.length, go back to 0
      if (currentCounter >= images.length * 10 - 10) {
        return setCounter(0);
      } else {
        let newCounter = currentCounter + nr * 10;
        return setCounter(newCounter);
      }
    });
  }

  function nextImageBackward(nr) {
    setCounter((currentCounter) => {
      // if less than 10, go back to the last set of images
      if (currentCounter < 10) {
        let newCounter = images.length * 10 + nr * 10;
        return setCounter(newCounter);
      } else {
        let newCounter = currentCounter + nr * 10;
        return setCounter(newCounter);
      }
    });
  }

  // Blend effect
  function imageBlend(toggle) {
    document.getElementById('layer1').style.opacity = toggle;
    document.getElementById('layer1').style.transitionDuration = '0.5s';
  }

  // same structure as above, should be simplied later

  function tempoStop(){
    clearInterval(timerRef.current)
    setGalleryPlaying(false)
  }
  function tempoSlider(){
    
     // clearInterval(timerRef.current); // Use timerRef.current to clear the interval
     timerID += 1;
    setGalleryPlaying(true)

      timerRef.current = setInterval(() => {
        setCounter((currentCounter) => {
          if (currentCounter >= 10 * images.length - 1) {
            setCounter(0);
            timerID = 0;
          }
          if ((currentCounter - 8) % 10 === 0) {
            imageBlend(0);
          }
          if (currentCounter % 10 === 0) {
            imageBlend(1);
          }
          return currentCounter + 1;
        });
      }, tempo);
      return () => {
        clearInterval(timerRef.current); // Use timerRef.current to clear the interval
      };

  }

  const handleKeyPress = (event) => {
    if (event.key === 'g') {
      // Your custom logic or event handling goes here
      setIsFullScreen(false)
      console.log(isFullScreen);
    }
    if (event.key === 'f') {
      // Your custom logic or event handling goes here
      setIsFullScreen(true)
      console.log(isFullScreen);
    }
  };
  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency

  return (
    <div id="gallery1">
      {/* double check the counter, since the other is not 100% safe */}
      {counter > images.length * 10 - 1 && setCounter(0)}
      <div id="layer1">

         

            <div  id="image" >
                {/*  counter is linked with array number of images */}
                {counter < 30 &&   <img id="galleryimage" // image will be hidden if counter more than 40
                src={images[Math.floor(counter / 10)]} alt="Gallery" /> }
            </div>

            <div className={`${counter > 30 && counter < 40 ?  'iframe-container2' : 'iframe-container'} `} >
                <iframe        
              //  src="https://martin-wrede.github.io/numbers9-text/index.html?age=24&name=&title=Frohe%20Weihnachten&text=Gr%C3%BC%C3%9Fe%20von%20Martin" 
                src="https://martin-wrede.github.io/numbers9-text/" 
               
                frameborder="0"
             //   className={`${isFullScreen  || "iframe-responsive-full"}`}
                className={`${isFullScreen  ? "iframe-responsive-full"  : "iframe-responsive" }`}
                ></iframe> 
            </div>   

        {/*
            <div  id="video">
                {counter > 40 &&  <ReactPlayer  // video will be shown if counter more than 40
                className='react-player'
                // url='/targetx-website/walkBremerhaven.mp4'
                url='https://www.youtube.com/watch?v=MYcQkjvY2RU&t=6s'
                playing={true}
                muted={true}
                height="100%"
                width="100%"
                />}
            </div>
  */}
      </div>
      <div  className="gallery-3d">
       {`${counter > 30 && counter < 40 ? "f: Full Screen   g: Normal Screen" : " "  }`}
       </div>
      <div className="gallery-menu">
       
      
        <img
          src={PfeilLinks}
          id="backward"
          onClick={() => nextImageBackward(-1)}
          className="gallery-menu-icon"
        />
        
        <span className="gallery-text">
          {Math.floor(counter / 10) + 1}/{images.length}
        </span>
        <img
          src={PfeilRechts}
          id="forward"
          onClick={() => nextImageForward(1)}
          className="gallery-menu-icon"
        />
        
        <img src={Rechteck} id="stop"
          onClick={tempoStop}
       
          className={`${galleryPlaying ? 'gallery-menu-icon':  'gallery-menu-icon-active' }`}
          
          />
        <img src={PfeilPlay} id="play" 
        onClick={tempoSlider}
        className={`${!galleryPlaying ? 'gallery-menu-icon':  'gallery-menu-icon-active' }`}
          
        />

        
        <button onClick={()=>checkRange(projectRange)}>check range</button>
     <br/> <br/> <br/>
       

      </div>
      {projectRange.map((el,i)=> <span key={i}> {el} / </span>) }
  
    </div>
  );
}
