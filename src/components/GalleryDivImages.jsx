import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import PfeilLinks from '../assets/pfeil-links.svg';
import PfeilRechts from '../assets/pfeil-rechts.svg';
import Rechteck from '../assets/rechteck.svg';
import PfeilPlay from '../assets/pfeil-play.svg';

let timerID = 0;

export default function GalleryDiv({ projectNumber, projectRange }) {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [tempo, setTempo] = useState(400);
  const timerRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [galleryPlaying, setGalleryPlaying] = useState(true);
  const [images, setImages] = useState([]);

  // Add this line to define imagesNeu
  const imagesNeu = data.length > 0 && data[`${projectNumber}`]?.gallery_image_names.map((image) => image);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/targetx-interactive/data2.json');
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    let updatedImages = [];

    if (projectRange) {
      updatedImages = projectRange.map((tempVar) => imagesNeu[tempVar]);
    } else {
      updatedImages = imagesNeu;
    }

    setImages(updatedImages);
  }, [projectRange, imagesNeu]);

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
      clearInterval(timerRef.current);
    };
  }, [tempo, images]);

  function nextImageForward(nr) {
    setCounter((currentCounter) => {
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
      if (currentCounter < 10) {
        let newCounter = images.length * 10 + nr * 10;
        return setCounter(newCounter);
      } else {
        let newCounter = currentCounter + nr * 10;
        return setCounter(newCounter);
      }
    });
  }

  function imageBlend(toggle) {
    document.getElementById('layer1').style.opacity = toggle;
    document.getElementById('layer1').style.transitionDuration = '0.5s';
  }

  function tempoStop() {
    clearInterval(timerRef.current);
    setGalleryPlaying(false);
  }

  function tempoSlider() {
    timerID += 1;
    setGalleryPlaying(true);

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
      clearInterval(timerRef.current);
    };
  }

  const handleKeyPress = (event) => {
    if (event.key === 'g') {
      setIsFullScreen(false);
    }
    if (event.key === 'f') {
      setIsFullScreen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency

  return (
    <div id="gallery1">
      {counter > images.length * 10 - 1 && setCounter(0)}
      <div id="layer1">
        <div id="image">
          {counter < 40 && <img id="galleryimage" src={images[Math.floor(counter / 10)]} alt="Gallery" />}
        </div>
      </div>
      <div className="gallery-3d">{`${counter > 30 && counter < 40 ? 'f: Full Screen   g: Normal Screen' : ' '}`}</div>
      <div className="gallery-menu">
        <img src={PfeilLinks} id="backward" onClick={() => nextImageBackward(-1)} className="gallery-menu-icon" />
        <span className="gallery-text">{Math.floor(counter / 10) + 1}/{images.length}</span>
        <img src={PfeilRechts} id="forward" onClick={() => nextImageForward(1)} className="gallery-menu-icon" />
        <img
          src={Rechteck}
          id="stop"
          onClick={tempoStop}
          className={`${galleryPlaying ? 'gallery-menu-icon' : 'gallery-menu-icon-active'}`}
        />
        <img
          src={PfeilPlay}
          id="play"
          onClick={tempoSlider}
          className={`${!galleryPlaying ? 'gallery-menu-icon' : 'gallery-menu-icon-active'}`}
        />
      </div>
      {projectRange && projectRange.map((el, i) => <span key={i}> {el} / </span>)}
    </div>
  );
}
