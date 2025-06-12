import React, { useContext } from 'react';
import Gallery from './Gallery';
import Roadmap from './Roadmap'; 
import { Context } from '../Context';


export default function Planner() {
  const { data } = useContext(Context);

  return (
 <div>
      <h1>Try the Planner</h1>
<br/>
 
  <b>1 Welches Haupt-Problem willst du lösen?</b>
      <br />
  <input></input>

     <br />     <br />
 <b>2 Welche Lösung siehst Du dafür?</b>

   <br />
  <input></input>
   <br /> <br />
  <b>3 In welchem Zeitraum willst Du das Ergebnis fertig haben?</b>
   <br />  
  <input></input>
     <br /> <br />
  <b>4 Welche Art von Ergebnis erwartest Du?</b>
  <br/>
    (Prototyp, fertiges Endprodukt)
   <br />  

  <input ></input>

     <br /> <br />
   <button>submit</button>
  
    <br /> <br />
  
      <h2> 1 Business Idea Input</h2>

            <iframe
            src="https://react-image-chatbot.pages.dev/"

            title="External Content"
            width="100%"
            height="400"
            style={{ border: '1px solid #ccc' }}
          ></iframe>

       <h2>2 Generate Plan</h2>

        
        
        <Roadmap 
        //  roadmapData={{ date, task, motivation}}
          />
       
       <h2>Tools</h2>



     <b> Image Generation</b>
     <br />
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
