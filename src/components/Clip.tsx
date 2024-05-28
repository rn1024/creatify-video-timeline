// Clip.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { Clip } from '../types';

interface ClipProps {
  clip: Clip;
}

const ClipComponent: React.FC<ClipProps> = ({ clip }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CLIP',
    item: { ...clip },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`clip ${clip.type}`}
      style={{
        left: `${clip.start * 10}px`,
        width: `${(clip.end - clip.start) * 10}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {clip.type}
    </div>
  );
};

export default ClipComponent;