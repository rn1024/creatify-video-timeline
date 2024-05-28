// types.ts
export type ClipType = 'video' | 'audio';

export interface Clip {
  id: number;
  start: number;
  end: number;
  type: ClipType;
  track: number;
}

export interface Track {
  id: number;
  clips: Clip[];
}