import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const mediaCategories = [
  { imageOrder: '0', duration: 10, name: 'Image Gallery', title:'Photos', mediaNumber: '0', imageUrl: '/targetx-interactive/Home-00.jpg', checkbox: true },
  { imageOrder: '1', duration: 10, name: 'Text', title:'Introtext', mediaNumber: '1', imageUrl: '/targetx-interactive/Home-01.jpg', checkbox: true },
  { imageOrder: '2', duration: 10, name: 'Info Graphic',title:'This is an information on an info-graphice', mediaNumber: '2', imageUrl: '/targetx-interactive/Home-02.jpg', checkbox: true },
  { imageOrder: '3', duration: 10, name: '3D/Video',title:'3d Numbers', mediaNumber: '3', imageUrl: '/targetx-interactive/Home-03.jpg', checkbox: true },
];

function LocalGallery({ mediaItems }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % mediaItems.length);
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup function
  }, [mediaItems.length]);

  // Add a check to ensure mediaItems and mediaItems[counter] are defined before accessing properties
  return (
    <>
      {mediaItems.length > 0 && mediaItems[counter] && (
        <>
          {mediaItems[counter].name} 
          <br/>
          {mediaItems[counter].title}
          <img src={mediaItems[counter].imageUrl} alt={mediaItems[counter].name} />
        </>
      )}
    </>
  );
}


function GalleryDivUrl({ mediaItems }) {
  return (
    <div id="gallery">
      
      <div id="gallery0">
        Gallery <LocalGallery  mediaItems={mediaItems} />
        </div>
   

      {mediaItems && mediaItems.map((el, i) => <span key={i}> {el.imageOrder} / </span>)}
    </div>
   
  );
}


function HowWeDoIt() {
  const [mediaItems, setMediaItems] = useState(mediaCategories);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    setMediaItems((prevItems) => {
      const items = Array.from(prevItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      return items;
    });
  }
// add new container
function updateMediaContainer() {
  // Find the maximum imageOrder in mediaItems
  const maxImageOrder = Math.max(...mediaItems.map(item => parseInt(item.imageOrder)));
  
  // Calculate a unique new imageOrder
  let newImageOrder = maxImageOrder >= 0 ? maxImageOrder + 1 : 0;
  while (mediaItems.some(item => item.imageOrder === newImageOrder.toString())) {
    // If the new imageOrder already exists, increment it until it's unique
    newImageOrder++;
  }

  const newItem = { 
    imageOrder: newImageOrder.toString(), 
    duration: 10, 
    name: 'Image Gallery', 
    imageUrl: `/targetx-interactive/Home-00.jpg`, 
    checkbox: true 
  };
  setMediaItems([newItem, ...mediaItems]);
}

  

  function updateMediaItem(imageOrder, property, value) {
  setMediaItems((prevMediaItems) =>
    prevMediaItems.map((mediaItem) => {
      if (mediaItem.imageOrder === imageOrder) {
        // Update the property value
        const updatedMediaItem = { ...mediaItem, [property]: value };

        // Update the imageUrl based on the new name
        if (value === 'Text') {
          updatedMediaItem.imageUrl = `/targetx-interactive/Home-01.jpg`;
        } else if (value === 'Info-Graphic') {
          updatedMediaItem.imageUrl = `/targetx-interactive/Home-02.jpg`;
        } else if (value === '3D/Video') {
          updatedMediaItem.imageUrl = `/targetx-interactive/Home-03.jpg`;
        } else {
          // Default to Image Gallery
          updatedMediaItem.imageUrl = `/targetx-interactive/Home-00.jpg`;
        }

        return updatedMediaItem;
      } else {
        return mediaItem;
      }
    })
  );
}





  function deleteDiv(imageOrder) {
    setMediaItems((prevMediaItems) =>
      prevMediaItems.filter((mediaItem) => mediaItem.imageOrder !== imageOrder)
    );
  }

  return (
    <div className="content_container" id="main">
      <div className="content_main" id="content">
        <h1 className="page-title entry-title">How we do it</h1>
        <GalleryDivUrl mediaItems={mediaItems} />
      </div>

      <div id="sidebar" className="content_sub">
        <span className="text-markierung">Drag and Drop</span>
        <br />
        <button onClick={() => updateMediaContainer()}>new container</button>
        <br />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* Droppable for existing containers */}
          <Droppable droppableId="mediaItems" type="MEDIA_ITEM">
            {(provided) => (
              <ul className="mediaItems" {...provided.droppableProps} ref={provided.innerRef}>
                {mediaItems.map(({ imageOrder, name, imageUrl,title, duration, checkbox }, index) => (
                  <Draggable key={imageOrder} draggableId={imageOrder} index={index}>
                  {(provided) => (
                    <li
                      key={imageOrder}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <hr />
                        <h3>name: {name}</h3>
                        <br/>
                        <select
                        id={imageOrder}
                        name="name"
                        style={{ width: "100%" }}
                        onChange={(event) => updateMediaItem(imageOrder, 'name', event.target.value)}
                        >
                        <option value="Image-Gallery">Image Gallery</option>
                        <option value="Text">Text</option>
                        <option value="Info-Graphic">Info Graphic</option>
                        <option value="3D/Video">3D/Video</option>
                      </select>

                        
                        <br />
                        <span>Order: {imageOrder}</span>
                        <br />

                        <span>Title: {title}</span>
                        <input
                          type="text"
                          id={imageOrder}
                          name="title"
                          defaultValue={title}
                          onChange={(event) => updateMediaItem(imageOrder, 'title', event.target.value)}                        />
                        <br />
                        <br />
                        {/*
                        <span>Duration: {duration}</span>
                        <input
                          type="number"
                          id={imageOrder}
                          name="duration"
                          defaultValue={duration}
                          onChange={(event) => updateMediaItem(imageOrder, 'duration', parseInt(event.target.value, 10))}
                        />
                        <br />
                        <br />
                        */}
                        <span>Checkbox: {checkbox}</span>
                        <br />
                        <input
                          type="checkbox"
                          id={imageOrder}
                          name="checkbox"
                          checked={checkbox}
                          onChange={(event) => updateMediaItem(imageOrder, 'checkbox', event.target.checked)}
                        />
                        <br />
                        <div className="characters-thumb">

                          <img 
                          
                          src={imageUrl} 
                     
                       
                          alt={name} />
                        </div>
                        <br /> <br />
                        <button onClick={() => deleteDiv(imageOrder)}>delete</button>
                      </div>
                    </li>
                  )}
                </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>

          {/* Droppable for new container */}
          <Droppable droppableId="newContainer" type="MEDIA_ITEM">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {/* Placeholder for the new container */}
                
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <p>{/* Button with debugging console.log */}</p>

        <br />
        <br />
        <div className="clear"></div>
      </div>
    </div>
  );
}

export default HowWeDoIt;
