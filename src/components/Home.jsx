import React, { useContext } from 'react';
import Gallery from './Gallery';
import { Context } from '../Context';

export default function Home() {
  const { data } = useContext(Context);

  return (
    <div>
  <div className="content_container" id="main"> 
      <div className="content_main" id="content">
      <h1>Home</h1>
  
         <Gallery  projectNumber="0" />
         </div>
         </div>
    </div>
  );
}
