import React, { useState } from 'react';

function DraggableImageList({ images, onReorder }) {
  const [list, setList] = useState(images);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newList = [...list];
    const [movedItem] = newList.splice(dragIndex, 1);
    newList.splice(dropIndex, 0, movedItem);
    setList(newList);
    onReorder(newList);
  };

  const handleDeleteImage = (index) => {
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
    onReorder(updated);
  };

  return (
    <div className="draggable-list">
      {list.map((img, idx) => (
        <div
          key={idx}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDrop={(e) => handleDrop(e, idx)}
          onDragOver={(e) => e.preventDefault()}
          className="image-item"
        >
          <img src={img} alt={`Номер ${idx}`} />
          <button onClick={() => handleDeleteImage(idx)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default DraggableImageList;