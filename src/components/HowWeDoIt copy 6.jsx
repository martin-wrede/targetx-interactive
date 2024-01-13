import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const mediaCategories = [
  {
    imageOrder: '0',
      duration: 10,
    name: 'Image Gallery',
    imageUrl: './images/image.jpg',
    checkbox: true,
  },
  {
    imageOrder: '1',
    duration: 10,
    name: 'Text',
    imageUrl: './images/image.jpg',
    checkbox: true,
  },
  {
    imageOrder: '2',
    duration: 10,
    name: 'Info Graphic',
    imageUrl: './images/image.jpg',
    checkbox: true, 
  },
  {
    imageOrder: '3',
    duration: 10,
    name: '3D',
    imageUrl: './images/image.jpg',
    checkbox: true,  
  },
];

function GalleryDivUrl({ projectRange, projectNumber, images, loadImages, newDuration }) {
 
 
  return (
    <div id="gallery1">
      
 
      {images.map((image, i) => (
        <div key={image}>
         Image No {i} {newDuration}
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
  const [mediaItems, setMediaItems] = useState(mediaCategories);
  

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

    const items = Array.from(mediaItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    items.splice(result.destination.index, 0, reorderedItem);

    setMediaItems(items);
    setNewOrder(items.map((item) => Number(item.imageOrder)));
  }
 

  return (
    <div className="content_container" id="main">
      <div className="content_main" id="content">
        <h1 className="page-title entry-title">How we do it</h1>
 
 <br />
        {/* Pass newOrder (renamed to projectRange) as a prop */}
        <GalleryDivUrl projectRange={newOrder} images={images} loadImages={loadImages} projectNumber="0" newDuration={newDuration} />

      </div>
      <div id="sidebar" className="content_sub">
        <span className="text-markierung">Drag and Drop</span>
        <h1> </h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="mediaItems">
            {(provided) => (
              <ul className="mediaItems" {...provided.droppableProps} ref={provided.innerRef}>
                {mediaItems.map(({ imageOrder, name, imageUrl }, index) => (
                  <Draggable
                    key={imageOrder}
                    draggableId={imageOrder}
                    index={index}
                  >
                    {(provided) => (
                      <li key={imageOrder} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="characters-thumb">
                          <img src={imageUrl} alt={`${name} Thumb`} />
                        </div>
                        <p>{name}</p> <br/> <br/>
                        <p>     duration:{newDuration}</p>
                        <br/> <br/>
                       

                      
                    
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
