import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const mediaCategories = [
  { imageOrder: '0', duration: 100, name: 'Image Gallery', imageUrl: '/targetx-interactive/Home-00.jpg', checkbox: true },
  { imageOrder: '1', duration: 10, name: 'Text', imageUrl: '/targetx-interactive/Home-01.jpg', checkbox: true },
  { imageOrder: '2', duration: 10, name: 'Info Graphic', imageUrl: '/targetx-interactive/Home-02.jpg', checkbox: true },
  { imageOrder: '3', duration: 10, name: '3D', imageUrl: '/targetx-interactive/Home-03.jpg', checkbox: true },
];

function GalleryDivUrl({ projectRange, mediaItems }) {
  return (
    <div id="gallery1">
      {mediaItems.map((image, i) => (
        <div key={image.imageOrder}>
          Image No {i} <br />
          Duration: {image.duration}<br />
          <img src={image.imageUrl} alt={`Image ${i}`} />
        </div>
      ))}

      <div id="layer1"></div>
      <div className="gallery-3d"></div>
      <div className="gallery-menu"></div>

      {projectRange && projectRange.map((el, i) => <span key={i}> {el} / </span>)}
    </div>
  );
}

function HowWeDoIt() {
  const [mediaItems, setMediaItems] = useState(mediaCategories);
  const [newOrder, setNewOrder] = useState([0, 1, 2, 3]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    setMediaItems((prevItems) => {
      const items = Array.from(prevItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      return items;
    });

    setNewOrder((prevOrder) => prevOrder.map((item) => Number(item.imageOrder)));
  }

  function updateMediaItem(imageOrder, property, value) {
    setMediaItems((prevMediaItems) =>
      prevMediaItems.map((mediaItem) =>
        mediaItem.imageOrder === imageOrder ? { ...mediaItem, [property]: value } : mediaItem
      )
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
        <GalleryDivUrl projectRange={newOrder} mediaItems={mediaItems} />
      </div>

      <div id="sidebar" className="content_sub">
        <span className="text-markierung">Drag and Drop</span>
        <br />
        <button onClick={() => updateMediaItem(imageOrder, 'name', 'New Container')}>
          new container
        </button>
        <br />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="mediaItems">
            {(provided) => (
              <ul className="mediaItems" {...provided.droppableProps} ref={provided.innerRef}>
                {mediaItems.map(({ imageOrder, name, imageUrl, duration, checkbox }, index) => (
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
                          <h3>{name}</h3>
                          <input
                            type="string"
                            id={imageOrder}
                            name="name"
                            defaultValue={name}
                            onChange={(event) => updateMediaItem(imageOrder, 'name', event.target.value)}
                          />
                          <br />
                          <span>Order: {imageOrder}</span>
                          <br />
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
                            <img src={imageUrl} alt={name} />
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
