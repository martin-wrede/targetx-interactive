import React, { useContext } from 'react';
import Gallery from './Gallery';
import Footer from './Footer';
import { Context } from '../Context';

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
      
        if (data[5] && data[5].content_chapter) {
          content = data[5].content_chapter.map((chapter, index) => (
            <div key={index}>
              <h1>{chapter.content_h1}</h1>
             
              <span>{chapter.content_h1_text}</span>
              <br />
              <br />
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
              <span className="text-markierung"> {data[5] && data[5].sidebar_h2}</span>
              <br />
              <br />
              <Gallery projectNumber="5"  />
              <br />
              <br />
              
              
              <br />
              <br />
            </div>
            <Footer />
          </div>
        );
      }
      