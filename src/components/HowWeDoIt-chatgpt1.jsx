import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const mediaCategories = [
  { imageOrder: '0', duration: 100, name: 'Image Gallery', imageUrl: '/targetx-interactive/Home-00.jpg', checkbox: true },
  { imageOrder: '1', duration: 10, name: 'Text', imageUrl: '/targetx-interactive/Home-01.jpg', checkbox: true },
  { imageOrder: '2', duration: 10, name: 'Info Graphic', imageUrl: '/targetx-interactive/Home-02.jpg', checkbox: true },
  { imageOrder: '3', duration: 10, name: '3D', imageUrl: '/targetx-interactive/Home-03.jpg', checkbox: true },
];

function GalleryDivUrl({ mediaItems }) {
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

      {mediaItems && mediaItems.map((el, i) => <span key={i}> {el.imageOrder} / </span>)}
    </div>
  );
}
// ... (previous imports)

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

  function updateMediaContainer(imageOrder, property, value) {
    const newImageOrder = mediaItems.length.toString();
    const newItem = { imageOrder: newImageOrder, duration: 10, name: 'New Container', imageUrl: '/path-to-default-image.jpg', checkbox: true };
    setMediaItems([newItem, ...mediaItems]);
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

