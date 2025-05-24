import { renderHook, act } from '@testing-library/react';
import { useGameLogic } from '../../hooks/useGameLogic';
import * as gameUtils from '../../utils/gameUtils';

// Mock the utility functions more explicitly
jest.mock('../../utils/gameUtils');

const mockGenerateRandomNumber = jest.mocked(gameUtils.generateRandomNumber);
const mockValidateGuess = jest.mocked(gameUtils.validateGuess);

describe('useGameLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up mocks before each test
    mockGenerateRandomNumber.mockReturnValue(42);
    mockValidateGuess.mockImplementation((guess, min, max) => 
      !isNaN(guess) && guess >= min && guess <= max
    );
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
    
    // Debug logging
    console.log('Game state after startGame:', result.current.gameState);
    console.log('generateRandomNumber mock calls:', mockGenerateRandomNumber.mock.calls);
    
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
      console.log('makeGuess response:', response);
      console.log('validateGuess mock calls:', mockValidateGuess.mock.calls);
      expect(response.success).toBe(true);
      expect(response.feedback).toBe('correct');
      expect(response.gameStatus).toBe('won');
    });
    
    expect(result.current.gameState.gameStatus).toBe('won');
    expect(result.current.gameState.attempts).toBe(1);
    expect(result.current.gameState.guessHistory).toHaveLength(1);
  });

  it('should handle too high guess', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.startGame('medium');
    });
    
    act(() => {
      const response = result.current.makeGuess('75');
      expect(response.success).toBe(true);
      expect(response.feedback).toBe('too-high');
      expect(response.gameStatus).toBe('playing');
    });
    
    expect(result.current.gameState.gameStatus).toBe('playing');
    expect(result.current.gameState.attempts).toBe(1);
  });

  it('should handle too low guess', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.startGame('medium');
    });
    
    act(() => {
      const response = result.current.makeGuess('25');
      expect(response.success).toBe(true);
      expect(response.feedback).toBe('too-low');
      expect(response.gameStatus).toBe('playing');
    });
    
    expect(result.current.gameState.gameStatus).toBe('playing');
    expect(result.current.gameState.attempts).toBe(1);
  });

  it('should end game when max attempts reached', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.startGame('expert'); // 5 attempts
    });
    
    // Make 5 wrong guesses
    for (let i = 1; i <= 5; i++) {
      act(() => {
        result.current.makeGuess('1'); // Wrong guess (secret is 42)
      });
    }
    
    expect(result.current.gameState.gameStatus).toBe('lost');
    expect(result.current.gameState.attempts).toBe(5);
  });

  it('should validate invalid guesses', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.startGame('medium');
    });
    
    // Mock validateGuess to return false for this test
    mockValidateGuess.mockReturnValueOnce(false);
    
    act(() => {
      const response = result.current.makeGuess('150'); // Out of range
      expect(response.success).toBe(false);
      expect(response.error).toBe('Please enter a number between 1 and 100');
    });
    
    expect(result.current.gameState.attempts).toBe(0); // No attempt should be counted
  });

  it('should reset game to menu', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.startGame('medium');
    });
    
    act(() => {
      result.current.makeGuess('50');
    });
    
    act(() => {
      result.current.resetGame();
    });
    
    expect(result.current.gameState.gameStatus).toBe('menu');
  });

  it('should update current guess', () => {
    const { result } = renderHook(() => useGameLogic());
    
    act(() => {
      result.current.updateCurrentGuess('75');
    });
    
    expect(result.current.gameState.currentGuess).toBe('75');
  });
});