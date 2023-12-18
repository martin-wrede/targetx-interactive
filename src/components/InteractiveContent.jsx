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
        <h1 className="page-title entry-title">Interactive Content Streaming</h1>

     <span className="text-markierung">  Kommunikations Angebote </span> <br/>
     <span className="text-markierung"> für Unternehmen, </span> <br/>
     <span className="text-markierung"> Einzelhandel und öffentliche Bereiche </span> <br/>  
<br/>
<br/>
        Indem Sie die Präsentations-Software von targetx nutzen, gewinnen Sie in jeder Hinsicht und in jeder Größenordnung: vom einzelnen Standort bis hin zu mehreren Niederlassungen. Sie können 24/7 Ihren Content senden! Dabei haben Sie selbst einfach Online Zugriff auf die Medien-Steuerung. Mit unserem Content-Provider können Sie Ihre Zielgruppe individuell ansprechen. Nutzen Sie unsere Startpakete als preisgünstige Komplettlösung für verschiedene Branchen.
        </div>
      </div>
      <div id="sidebar" className="content_sub">
        <span className="text-markierung"> {data[1] && data[1].sidebar_h2}
        </span> <br />
        <br />
        <img src="contact-iot-1024x611.jpg" />
       
       
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}
