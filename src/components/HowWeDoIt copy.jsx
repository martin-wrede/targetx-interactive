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

function GalleryDivUrl({ projectRange, projectNumber, images, loadImages  }) {
 
 
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
  const [mediaItems, setMediaItems] = useState(mediaCategories);

  const [newOrder, setNewOrder] = useState([0, 1, 2, 3]);
  const [newDuration,setNewDuration] = useState(10)
  
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
 ///// inputfunctions begin ///////////


 function updateCheckbox(imageOrder, event) {
  const localNewCheckboxValue = event.target.checked; // Use 'checked' instead of 'value' for checkbox

  setMediaItems((prevMediaItems) =>
    prevMediaItems.map((mediaItem) =>
      mediaItem.imageOrder === imageOrder
        ? { ...mediaItem, checkbox: localNewCheckboxValue }
        : mediaItem
    )
  );
}


function updateTitle(imageOrder, event) {
  const localNewTitle = event.target.value;

  setMediaItems((prevMediaItems) =>
    prevMediaItems.map((mediaItem) =>
      mediaItem.imageOrder === imageOrder
        ? { ...mediaItem, name: localNewTitle }
        : mediaItem
    )
  );
}
function updateDuration(imageOrder, event) {
  const localNewDuration = event.target.value;

  setMediaItems((prevMediaItems) =>
    prevMediaItems.map((mediaItem) =>
      mediaItem.imageOrder === imageOrder
        ? { ...mediaItem, duration: parseInt(localNewDuration, 10) }
        : mediaItem
    )
  );
}
function updateCheckbox(imageOrder, event) {
  const localNewDuration = event.target.checked;
  setMediaItems((prevMediaItems) =>
    prevMediaItems.map((mediaItem) =>
      mediaItem.imageOrder === imageOrder
        ? { ...mediaItem, checkbox: localNewDuration }
        : mediaItem
    )
  );
}

function deleteDiv(imageOrder) {
  setMediaItems((prevMediaItems) =>
    prevMediaItems.filter((mediaItem) => mediaItem.imageOrder !== imageOrder)
  );
}
///// inputfunctions end ///////////

///// mediatiem begin ///////////

function MediaItem({
  imageOrder,
  duration,
  name,
  imageUrl,
  loop,
  id,
  checkbox,
}) {
  return (
    <div>
      <hr />
      <h3>{name}</h3>
      <input
        type="string"
        id={imageOrder}
        name="name"
        defaultValue={
          mediaItems.find((obj) => obj.imageOrder === imageOrder)?.name || ""
        }
        onChange={(event) => updateTitle(imageOrder, event)}
      />
      <br />
      <span>Order: {imageOrder}</span>
      <br />
      <span>Duration: {duration}</span>
      <input
        type="number"
        id={imageOrder}
        name="duration"
        defaultValue={
          mediaItems.find((obj) => obj.imageOrder === imageOrder)?.duration ||
          ""
        }
        onChange={(event) => updateDuration(imageOrder, event)}
      />
      <br />
      <br />
      <span>Loop: {loop}</span>
      <br />
      <input
        type="checkbox"
        id={imageOrder}
        name="checkbox"
        checked={checkbox}
        onChange={(event) => updateCheckbox(imageOrder, event)}
      />
      <br />
      <div className="characters-thumb">
      <img src={imageUrl} alt={name}  />
      </div>
      <br /> <br />
      <button onClick={() => deleteDiv(imageOrder)}>delete</button>
    </div>
  );
}
//  mediaitem end

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
              <MediaItem {...mediaItems[index]} />
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
