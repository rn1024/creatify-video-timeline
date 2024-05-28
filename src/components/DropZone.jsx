import React from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
  BOX: 'box',
};

const DropZone = () => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'DropZone' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const dropZoneStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: canDrop ? (isOver ? 'darkgreen' : 'lightgreen') : 'lightgrey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return <div ref={drop} style={dropZoneStyle}>Drop Here</div>;
};

export default DropZone;