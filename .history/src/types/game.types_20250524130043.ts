export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface GameConfig {
  maxAttempts: number;
  minNumber: number;
  maxNumber: number;
}

export interface GameState {
  secretNumber: number;
  currentGuess: string;
  attempts: number;
  maxAttempts: number;
  guessHistory: GuessResult[];
  gameStatus: 'playing' | 'won' | 'lost' | 'menu';
  difficulty: DifficultyLevel;
}

export interface GuessResult {
  guess: number;
  feedback: 'too-high' | 'too-low' | 'correct';
  attemptNumber: number;
}

export interface GuessResponse {
  success: boolean;
  feedback?: 'too-high' | 'too-low' | 'correct';
  gameStatus?: 'playing' | 'won' | 'lost';
  error?: string;
}