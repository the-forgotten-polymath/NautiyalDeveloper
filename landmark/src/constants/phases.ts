export interface Phase {
  start: number;
  end: number;
  label: string;
}

export const PHASES = {
  LAND:         { start: 0.00, end: 0.08, label: 'LAND' },
  FOUNDATION:   { start: 0.08, end: 0.22, label: 'FOUNDATION' },
  SKELETON:     { start: 0.22, end: 0.42, label: 'SKELETON' },
  ARCHITECTURE: { start: 0.42, end: 0.60, label: 'ARCHITECTURE' },
  INTERIOR:     { start: 0.60, end: 0.78, label: 'INTERIOR' },
  REVEAL:       { start: 0.78, end: 1.00, label: 'REVEAL' },
};
