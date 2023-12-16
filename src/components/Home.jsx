import React, { useContext } from 'react';
import Gallery from './Gallery';
import GalleryDiv from './GalleryDiv';
import { Context } from '../Context';

export default function Home() {
  const { data } = useContext(Context);

  return (
    <div>
    
   {/*   <Gallery2  projectNumber="0" />     */}
   
   <GalleryDiv  projectNumber="0" />


      <h1>{data[0] && data[0].gallery_image_title}</h1>
      <h2>{data[0] && data[0].content_h1}</h2>
      <span>
        <i>{data[0] && data[0].content_h1_text}</i>
      </span>
    </div>
  );
}
