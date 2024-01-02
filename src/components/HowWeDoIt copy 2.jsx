import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GalleryDivUrl from './GalleryDivUrl';
 import GalleryDiv from './GalleryDiv';
 
const mediaCategories = [
  {
    id: '0',
    name: 'Image Gallery',
    thumb: './images/image00.jpg'
  },  
  {
    id: '1',
    name: 'Text',
    thumb: './images/image01.jpg'
  },
  {
    id: '2',
    name: 'Info Graphic',
    thumb:  './images/image02.jpg'
  },
  {
    id: '3',
    name: '3D',
    thumb:  './images/image03.jpg'
  }
 /*
 {
    id: '4',
    name: 'Video',
    thumb: '/images/image.jpg'
  },
  */

];



// const myUrlLocal2 = '/targetx-interactive/how-we-do-it/'

//window.location.href= myUrlLocal2;

/// console.log(projectRange0);

export default function HowWeDoIt() {
  const [characters, updateCharacters] = useState(mediaCategories);
  const [newOrder, setNewOrder] = useState([]);
  const [newTrick, setNewTrick] = useState([0,1,2,3]);
  

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    
    setNewOrder(items)
  }

  const sendUrl = (arg) => {
   
      // const local = newOrder.map(item => item.id)a
    
      const local = arg.map(item => Number(item.id))
     
      setNewTrick(local)
   
   //   console.log(newTrick)   
      
  }

  return (
    
    <div className="content_container" id="main">
    <div className="content_main" id="content">
      <h1 className="page-title entry-title">How we do it</h1>
      
      <GalleryDivUrl  projectRange={newTrick}  projectNumber="0" // projectNumber Home is 0x
       />
      


      </div>
        <div id="sidebar" className="content_sub">
        <span className="text-markierung">Drag and Drop</span>
        <h1> </h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name, thumb }, index) => (
                  <Draggable 
                  key={id} 
                  draggableId={id} 
                  index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="characters-thumb">
                          <img src={thumb} alt={`${name} Thumb`} />
                        </div>
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
     
      <p>
       <button 
       onClick={()=>sendUrl(newOrder)}
       type="submit"
       >
        update order
       </button>
      </p>
       
        <br/>
        <br/>
        
        
          <div className="clear"></div>
        </div>
      </div>
    )
}