
import React from 'react'

export default function Contact(){
    return (
        <div className="content_container" id="main">
        <div className="content_main" id="content">
          <h1 className="page-title entry-title">Umsetzung</h1>
          <p>targetx Medien-Design</p>
          <p>
            Martin Wrede
            <br />
            Dipl. Grafik-Designer
          </p>
          <p>
            Kameruner Straße 49
            <br />
            13351 Berlin
            <br />
            Tel: 030-78084990
            <br />
            mail:{" "}
            <a
              title="E-Mail"
              href="mailto:%69%6E%66%6F%40%74%61%72%67%65%74%78%2E%64%65"
            >
              info@targetx.de
            </a>
          </p>
          <h1 className="page-title entry-title">Impressum</h1>
          <p>
          
          
          </p>
        </div>
        <div id="sidebar" className="content_sub">
        <span className="text-markierung">Contact me!</span>
        <br/>
        <br/>
        
        <img src="contact-iot-1024x611.jpg" />
          <div className="clear"></div>
        </div>
      </div>
    )
}