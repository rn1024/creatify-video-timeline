// Material.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { Clip, ClipType } from '../types';

interface MaterialProps {
  material: Omit<Clip, 'start' | 'end' | 'track'> & { duration: number };
}

const Material: React.FC<MaterialProps> = ({ material }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CLIP',
    item: { id: material.id, start: 0, end: material.duration, type: material.type, track: 0 }, // 新片段默认参数
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`material ${material.type}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {material.type}
    </div>
  );
};

export default Material;