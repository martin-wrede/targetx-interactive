import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const mediaCategories = [
  {
    id: '0',
    name: 'Image Gallery',
    thumb: './images/image.jpg',
  },
  {
    id: '1',
    name: 'Text',
    thumb: './images/image.jpg',
  },
  {
    id: '2',
    name: 'Info Graphic',
    thumb: './images/image.jpg',
  },
  {
    id: '3',
    name: '3D',
    thumb: './images/image.jpg',
  },
];

function GalleryDivUrl({ projectRange, projectNumber, images, loadImages }) {
 
 
  return (
    <div id="gallery1">
      
 
      {images.map((image, i) => (
        <div key={image}>
         Image No {i}
          <img src={image} alt={`Image ${i}`} />
        </div>
      ))}

      <div id="layer1"></div>
      <div className="gallery-3d"></div>
      <div className="gallery-menu"></div>

      {projectRange && projectRange.map((el, i) => <span key={i}> {el} / </span>)}

     
    </div>
  );
}

export default function HowWeDoIt() {
  const [characters, updateCharacters] = useState(mediaCategories);
  const [newOrder, setNewOrder] = useState([0, 1, 2, 3]);
  const [newDuration,setNewDuration] = useState(10)
  const [taskList, setTaskList] = useState([])
  const [images, setImages] = useState([
    '/targetx-interactive/Home-00.jpg',
    '/targetx-interactive/Home-01.jpg',
    '/targetx-interactive/Home-02.jpg',
    '/targetx-interactive/Home-03.jpg',
  ]);

  function loadImages(projectRange) {
    console.log('Updating images with projectRange:', projectRange);
    setImages(
      [
        `/targetx-interactive/Home-0${projectRange[0]}.jpg`,
        `/targetx-interactive/Home-0${projectRange[1]}.jpg`,
        `/targetx-interactive/Home-0${projectRange[2]}.jpg`,
        `/targetx-interactive/Home-0${projectRange[3]}.jpg`,
      ]
    );
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    setNewOrder(items.map((item) => Number(item.id)));
  }

  // update duration 
  function updateDuration(event) {
    const localNewDuration =  event.target.value  
    setNewDuration(localNewDuration)
    console.log(newDuration)
  }
  // delete task
  //function deleteTask(id){
   // const filtered = taskList.filter(index => index.id !== id)
  //  updateCharacters(filtered)
  // }

  function deleteTask(id) {
    const filteredCharacters = characters.filter(character => character.id !== id);
    updateCharacters(filteredCharacters);
  }
  
  return (
    <div className="content_container" id="main">
      <div className="content_main" id="content">
        <h1 className="page-title entry-title">How we do it</h1>
 
 <br />
        {/* Pass newOrder (renamed to projectRange) as a prop */}
        <GalleryDivUrl projectRange={newOrder} images={images} loadImages={loadImages} projectNumber="0" />

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
                    index={index}
                  >
                    {(provided) => (
                      <li key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="characters-thumb">
                          <img src={thumb} alt={`${name} Thumb`} />
                        </div>
                        <p>{name}</p> <br/> <br/>
                        <p>     duration:{newDuration}</p>
                        <br/> <br/>
                         
                        <input 
                        type="number"
                        id={id}
                      //  value={id}
                        name="duration"
                      onChange={updateDuration}
                     //   onChange={updateDuration}
                         />

                      
                        <button onClick={() => deleteTask(id)} type="button">-</button>

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
          {/* Button with debugging console.log    */}

   
          <button onClick={() => loadImages(newOrder)}>Update Order</button>
          </p>

        <br />
        <br />

        <div className="clear"></div>
      </div>
    </div>
  );
}
