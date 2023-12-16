import React, { useContext } from 'react';
import Gallery from './Gallery';
import Footer from './Footer';
import { Context } from '../Context';

export default function UxuiDesign() {
  const { data } = useContext(Context);

  let content_ux = null;

  if (data[1] && data[1].content_chapter) {
    content_ux = data[1].content_chapter.map((chapter, index) => (
      <div key={index}>
        <h1>{chapter.content_h1}</h1>
        <span>{chapter.content_h1_text}</span>
        <br /><br />

        <span className="text_en">{chapter.content_h1_text2}</span>
        <h2>{chapter.content_h2}</h2>
        

        <img
          className="content-image"
          src={`${chapter.content_h2_image}`}
         // src={import.meta.env.BASE_URL + `${chapter.content_h2_image}`}
        />
         <span><i>{chapter.content_h2_text1}</i></span>
         <br />
      <br /> 
      Tasks: <br /> 
      <span>{chapter.content_h2_text2}</span> <br />
   
        <br />
        <button onClick={() => window.open(chapter.button_url)}>{chapter.button}</button>
        <br />
        <br />
      </div>
    ));
  }

  return (
    <div>
      <div className="content_container" id="main">
        <div className="content_main" id="content">
          {content_ux}
        </div>
      </div>
      <div id="sidebar" className="content_sub">
        <span className="text-markierung"> {data[1] && data[1].sidebar_h2}
        </span> <br />
        <br />
        {data[1] &&  <img src={`${data[1].sidebar_image}`} />
        }
       
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}
