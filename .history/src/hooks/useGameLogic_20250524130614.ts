import { useState, useCallback } from 'react';
import { GameState, DifficultyLevel, GuessResult, GuessResponse } from '../types/game.types';
import { generateRandomNumber, validateGuess } from '../utils/gameUtils';

const DIFFICULTY_CONFIG = {
  easy: { maxAttempts: 15, minNumber: 1, maxNumber: 100 },
  medium: { maxAttempts: 10, minNumber: 1, maxNumber: 100 },
  hard: { maxAttempts: 7, minNumber: 1, maxNumber: 100 },
  expert: { maxAttempts: 5, minNumber: 1, maxNumber: 100 }
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    secretNumber: 0,
    currentGuess: '',
    attempts: 0,
    maxAttempts: 10,
    guessHistory: [],
    gameStatus: 'menu',
    difficulty: 'medium'
  });

  const startGame = useCallback((difficulty: DifficultyLevel) => {
    const config = DIFFICULTY_CONFIG[difficulty];
    const secretNumber = generateRandomNumber(config.minNumber, config.maxNumber);
    
    setGameState({
      secretNumber,
      currentGuess: '',
      attempts: 0,
      maxAttempts: config.maxAttempts,
      guessHistory: [],
      gameStatus: 'playing',
      difficulty
    });
  }, []);

  const makeGuess = useCallback((guess: string): GuessResponse => {
    const numGuess = parseInt(guess);
    
    // Validate input
    if (!validateGuess(numGuess, 1, 100)) {
      return { success: false, error: 'Please enter a number between 1 and 100' };
    }

    const newAttempts = gameState.attempts + 1;
    let feedback: 'too-high' | 'too-low' | 'correct';
    let newGameStatus: 'playing' | 'won' | 'lost' = 'playing';

    if (numGuess === gameState.secretNumber) {
      feedback = 'correct';
      newGameStatus = 'won';
    } else if (numGuess > gameState.secretNumber) {
      feedback = 'too-high';
    } else {
      feedback = 'too-low';
    }

    // Check if game is lost
    if (newAttempts >= gameState.maxAttempts && feedback !== 'correct') {
      newGameStatus = 'lost';
    }

    const guessResult: GuessResult = {
      guess: numGuess,
      feedback,
      attemptNumber: newAttempts
    };

    setGameState(prev => ({
      ...prev,
      attempts: newAttempts,
      guessHistory: [...prev.guessHistory, guessResult],
      gameStatus: newGameStatus,
      currentGuess: ''
    }));

    return { success: true, feedback, gameStatus: newGameStatus };
  }, [gameState.secretNumber, gameState.attempts, gameState.maxAttempts]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'menu'
    }));
  }, []);

  const updateCurrentGuess = useCallback((guess: string) => {
    setGameState(prev => ({
      ...prev,
      currentGuess: guess
    }));
  }, []);

  return {
    gameState,
    startGame,
    makeGuess,
    resetGame,
    updateCurrentGuess
  };
};