import React from 'react';

export enum BreathingPhase {
  Idle = 'Idle',
  Inhale = 'Inhale',
  HoldFull = 'Hold (Full)',
  Exhale = 'Exhale',
  HoldEmpty = 'Hold (Empty)'
}

export interface BreathingState {
  phase: BreathingPhase;
  progress: number; // 0 to 1 representing progress through current phase
  isActive: boolean;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}