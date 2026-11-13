export type MainView = 'home' | 'materi' | 'games' | 'quiz' | 'hasil';

export type GameId = 'tebak-berat' | 'pasangkan' | 'pasar-ceria' | 'timbangan-ajaib' | 'kuis';

export type ItemKey =
  | 'beras'
  | 'gula'
  | 'apel'
  | 'semangka'
  | 'tepung'
  | 'buku'
  | 'cokelat'
  | 'jeruk'
  | 'mangga'
  | 'wortel'
  | 'kentang';

export type AwardTitle = 'Bintang Pemula' | 'Ahli Timbangan' | 'Juara Satuan Berat';

export interface ActivityRecord {
  played: boolean;
  completed: boolean;
  bestScore: number;
  correct: number;
  wrong: number;
}

export interface StudentProgress {
  studentName: string;
  soundEnabled: boolean;
  materiVisited: number[];
  activities: Record<GameId, ActivityRecord>;
}

export interface EverydayItem {
  id: ItemKey;
  name: string;
  sampleWeightLabel: string;
  weightInGrams: number;
  shortDesc: string;
}

export interface ScaleToolInfo {
  id: 'digital' | 'jarum' | 'duduk';
  name: string;
  shortFunction: string;
  whereUsed: string;
  accentColor: 'sky' | 'amber' | 'emerald';
}

export interface TebakBeratQuestion {
  id: string;
  item: ItemKey;
  itemName: string;
  clue: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
}

export interface MarketItem {
  id: ItemKey;
  name: string;
  unitLabel: string;
  gramsPerUnit: number;
  priceLabel: string;
}

export interface PasarMission {
  id: string;
  instruction: string;
  type: 'single-item' | 'multi-unit';
  validItemIds: ItemKey[];
  targetItemId?: ItemKey;
  targetQuantity?: number;
  explanation: string;
}

export interface TimbanganRound {
  id: string;
  leftItem: ItemKey;
  leftLabel: string;
  leftGrams: number;
  rightItem: ItemKey;
  rightLabel: string;
  rightGrams: number;
  question: string;
  options: { id: 'kiri' | 'kanan' | 'sama'; label: string }[];
  correctOption: 'kiri' | 'kanan' | 'sama';
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  topic: string;
  question: string;
  itemVisual?: ItemKey;
  options: string[];
  correctIndex: number;
  explanation: string;
}
