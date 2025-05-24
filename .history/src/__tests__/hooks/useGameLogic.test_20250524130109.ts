import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from '../../hooks/useGameLogic';

// Mock the utility functions
jest.mock('../../utils/gameUtils', () => ({
  generateRandomNumber: jest.fn(() => 42), // Always return 42 for predictable testing
  validateGuess: jest.fn((guess, min, max) => !isNaN(guess) && guess >= min && guess <= max),
}));

describe('useGameLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useGameLogic());
    
    expect(result.current.gameState.gameStatus).toBe('menu');
    expect(result.current.gameState.attempts).toBe(0);
    expect(result.current.gameState.guessHistory).toEqual([]);
    expect(result.current.gameState.difficulty).toBe('medium');
  });

  it('should start a new game with correct difficulty settings', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.startGame('hard');
    });
    
    expect(result.current.gameState.gameStatus).toBe('playing');
    expect(result.current.gameState.difficulty).toBe('hard');
    expect(result.current.gameState.maxAttempts).toBe(7);
    expect(result.current.gameState.secretNumber).toBe(42);
    expect(result.current.gameState.attempts).toBe(0);
  });

  it('should handle correct guess and win the game', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.startGame('medium');
    });
    
    act(() => {
      const response = result.current.makeGuess('42');
      expect(response.success).toBe(true);
      expect(response.feedback).toBe('correct');
      expect(response.gameStatus).toBe('won');
    });
    
    expect(result.current.gameState.gameStatus).toBe('won');
    expect(result.current.gameState.attempts).toBe(1);
    expect(result.current.gameState.guessHistory).toHaveLength(1);
  });

  it('should update current guess', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.updateCurrentGuess('75');
    });
    
    expect(result.current.gameState.currentGuess).toBe('75');
  });
});