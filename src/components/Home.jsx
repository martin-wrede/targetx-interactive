import React, { useContext } from 'react';
import Gallery from './Gallery';
import { Context } from '../Context';

export default function Home() {
  const { data } = useContext(Context);

  return (
    <div>
 
      <h1>Home</h1>
  
         <Gallery  projectNumber="0" />
         </div>
  )
}
