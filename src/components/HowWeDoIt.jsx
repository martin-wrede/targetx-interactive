import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const mediaCategories = [
  {
    id: '0',
    name: 'Image Gallery',
    thumb: './images/image00.jpg',
  },
  {
    id: '1',
    name: 'Text',
    thumb: './images/image01.jpg',
  },
  {
    id: '2',
    name: 'Info Graphic',
    thumb: './images/image02.jpg',
  },
  {
    id: '3',
    name: '3D',
    thumb: './images/image03.jpg',
  },
];

function GalleryDivUrl({ projectRange, projectNumber }) {
  const [images, setImages] = useState([
    '/targetx-interactive/Home-00.jpg',
    '/targetx-interactive/Home-01.jpg',
    '/targetx-interactive/Home-02.jpg',
    '/targetx-interactive/Home-03.jpg',
  ]);

  function loadImages(projectRange) {
    setImages(
      [
        `/targetx-interactive/Home-0${projectRange[0]}.jpg`,
        `/targetx-interactive/Home-0${projectRange[1]}.jpg`,
        `/targetx-interactive/Home-0${projectRange[2]}.jpg`,
        `/targetx-interactive/Home-0${projectRange[3]}.jpg`,
      ]
    );
  }

  return (
    <div id="gallery1">
      {images.map((image, i) => (
        <div key={image}>
         Image No: {i}
          <img src={image} alt={`Image ${i}`} />
        </div>
      ))}

      <div id="layer1"></div>
      <div className="gallery-3d"></div>
      <div className="gallery-menu"></div>

      {projectRange && projectRange.map((el, i) => <span key={i}> {el} / </span>)}

      {/* Button now calls the loadImages function directly */}
      <button onClick={() => loadImages(projectRange)}>Update Order</button>
    </div>
  );
}

export default function HowWeDoIt() {
  const [characters, updateCharacters] = useState(mediaCategories);
  const [newTrick, setNewTrick] = useState([0, 1, 2, 3]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    setNewTrick(items.map((item) => Number(item.id)));
  }

  return (
    <div className="content_container" id="main">
      <div className="content_main" id="content">
        <h1 className="page-title entry-title">How we do it</h1>

        {/* Pass newTrick (renamed to projectRange) as a prop */}
        <GalleryDivUrl projectRange={newTrick} projectNumber="0" />

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
          {/* Removed the separate button for updating the order */}
          <button type="submit">Update Order</button>
        </p>

        <br />
        <br />

        <div className="clear"></div>
      </div>
    </div>
  );
}
