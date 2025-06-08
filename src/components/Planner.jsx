import React, { useContext } from 'react';
import Gallery from './Gallery';
 
import { Context } from '../Context';


export default function Planner() {
  const { data } = useContext(Context);

  return (
 <div>
  
   
      <h1>Try the Planner</h1>
<br/>
 
      <h2> 1 Business Idea Input</h2>

            <iframe
            src="https://react-image-chatbot.pages.dev/"

            title="External Content"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>

       <h2>2 Generate Plan</h2>

        //////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
       
       <h2>3 Image Generation</h2>

         <iframe
            src="https://react-image-creator-2.pages.dev/"

            title="External Content"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
 
</div>
  );
}
