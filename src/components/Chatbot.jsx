import React, { useContext } from 'react';
import Gallery from './Gallery';
 
import { Context } from '../Context';


export default function Chatbot(){
  const {data} = useContext(Context)
     


  let content = null
  if (data[2] && data[2].content_chapter) {
    content = data[2].content_chapter.map((chapter, index) => (
      <div key={index}>
        
        <h1>{chapter.content_h1}</h1> 
        <h2>{chapter.content_h2}</h2>

        <span>{chapter.content_h1_text}</span>
       
      <br /> 
      </div>
    ))
    }

    return (
        <div className="content_container" id="main">
      <div className="content_main" id="content">
      
       <h1> CHATBOT</h1>
       
      

       <iframe
            src="https://react-image-chatbot.pages.dev/"

            title="External Content"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
      </div>
      <div id="sidebar" className="content_sub">
      <span className="text-markierung"> {data[2] && data[2].sidebar_h2}</span>
      <br />
              <br />
      {data[2] &&  <img src={`${data[2].sidebar_image}`} />
        }
      <br />
              <br />
              
              
              <br />
              <br />
            </div>
            
          </div>
        );
      }
      