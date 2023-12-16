import React, { useContext } from 'react';
import Gallery from './Gallery';
import Footer from './Footer';
import { Context } from '../Context';
/*
import Image01 from '../assets/Lakonia-01.jpg'
import Image02 from '../assets/Lakonia-02.jpg'
import Image03 from '../assets/Lakonia-03.jpg'
import Image04 from '../assets/Lakonia-04.jpg'
import Image05 from '../assets/Lakonia-05.jpg'
import Image06 from '../assets/Lakonia-06.jpg'
*/
import '../App.css';

export default function HistMuseumBremerhaven () {
        const { data } = useContext(Context);

        let content = null;

        function textModify(myString){
          console.log(myString)
      //  const myText = document.querySelector("#text1")
      //  return myText.innerHTML = myString.split(",")
          
         // return chapter.content_h2_text2.split(",").join("<br />")
        }
      
        if (data[3] && data[3].content_chapter) {
          content = data[3].content_chapter.map((chapter, index) => (
            <div key={index}>
              <h1>{chapter.content_h1}</h1>
              <h2>{chapter.content_h2}</h2>
              <span>{chapter.content_h1_text}</span>
      
              <img
                className="content-image"
                src={`${chapter.content_h2_image}`}
               // src={import.meta.env.BASE_URL + `${chapter.content_h2_image}`}
              />
               <div id="text1" ><i>{chapter.content_h2_text1}</i></div>
               <br />
            <br /> 
            Tasks: <br /> 
            <span>{ chapter.content_h2_text2}</span> <br />
           
              <br />
              {/* 
              <button onClick={() => window.open(chapter.button_url)}>{chapter.button}</button>
              */}
              <br />
              <br />
            </div>
          ));
        }
      
        return (
          <div>
            <div className="content_container" id="main">
              <div className="content_main" id="content">
                {content}
              </div>
            </div>
            <div id="sidebar" className="content_sub">
              <span className="text-markierung"> {data[3] && data[3].sidebar_h2}</span>
              <br />
              <br />
             
              <Gallery projectNumber="3" />
              <br />
              <br />
              <Gallery projectNumber="2" />
              <br />
              <br />

               
              
              <br />
              <br />
            </div>
            <Footer />
          </div>
        );
      }
      