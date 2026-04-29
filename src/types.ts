export type StatType = 'Harmony' | 'Chaos' | 'Insight' | 'Sin';

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  impact?: {
    stat: StatType;
    value: number;
  };
}

export interface CharacterConfig {
  id: string;
  name: string;
  image: string;
  position: 'left' | 'center' | 'right';
}

export interface Scene {
  id: string;
  background: string;
  characters: CharacterConfig[];
  dialogue: string[];
  choices: Choice[];
  music?: string;
  isMiniGame?: boolean;
  speakerName?: string; // Optional override for speaker name
}

export interface GameState {
  currentSceneId: string;
  stats: Record<StatType, number>;
  inventory: string[];
  history: string[];
}
