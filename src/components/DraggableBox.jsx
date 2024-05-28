import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BOX: 'box',
};

const DraggableBox = () => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { name: 'DraggableBox' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const boxStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'blue',
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return <div ref={drag} style={boxStyle} />;
};

export default DraggableBox;