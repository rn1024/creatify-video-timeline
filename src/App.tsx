// App.tsx
import React from 'react';
import Timeline from './components/Timeline';
import Material from './components/Material';
import { ClipType } from './types';
import './App.css';

const App: React.FC = () => {
  const materials: { id: number; type: ClipType; duration: number }[] = [
    { id: 1, type: 'video', duration: 10 },
    { id: 2, type: 'audio', duration: 5 },
  ];

  return (
    <div className="app">
      <h1>Video Editor</h1>
      <div className="material-container">
        {materials.map(material => (
          <Material key={material.id} material={material} />
        ))}
      </div>
      <Timeline />
    </div>
  );
};

export default App;