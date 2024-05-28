// Timeline.tsx
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import ClipComponent from './Clip';
import { Clip, Track } from '../types';
import './Timeline.css';

const Timeline: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([
    { id: 1, clips: [{ id: 1, start: 0, end: 10, type: 'video', track: 1 }] },
    { id: 2, clips: [{ id: 2, start: 12, end: 20, type: 'audio', track: 2 }] },
  ]);

  const [, drop] = useDrop({
    accept: 'CLIP',
    drop: (item: Clip, monitor) => {
      console.log('Drop event triggered'); // 调试输出
      const delta = monitor.getDifferenceFromInitialOffset() as { x: number, y: number };
      const newStart = Math.max(0, item.start + delta.x / 10);
      const newEnd = Math.max(newStart, item.end + delta.x / 10);

      const dropClientOffset = monitor.getClientOffset();
      const dropOffset = monitor.getInitialClientOffset();

      const isNewTrack = dropClientOffset && dropOffset && (dropClientOffset.y - dropOffset.y > 50);

      if (isNewTrack) {
        // 创建新轨道
        setTracks([...tracks, { id: tracks.length + 1, clips: [{ ...item, start: newStart, end: newEnd, track: tracks.length + 1 }] }]);
      } else {
        // 添加到现有轨道
        const updatedTracks = tracks.map(track => {
          if (track.id === item.track) {
            return {
              ...track,
              clips: track.clips.map(clip => clip.id === item.id
                ? { ...clip, start: newStart, end: newEnd }
                : clip)
            };
          }
          return track;
        });
        setTracks(updatedTracks);
      }
    },
  });

  return (
    <div className="timeline-container" ref={drop}>
      {tracks.map(track => (
        <div key={track.id} className="track">
          {track.clips.map(clip => (
            <ClipComponent key={clip.id} clip={clip} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;