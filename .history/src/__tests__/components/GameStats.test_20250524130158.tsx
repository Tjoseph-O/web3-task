import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameStats } from '../../components/GameStats';
import { GuessResult } from '../../types/game.types';

describe('GameStats', () => {
  const mockGuessHistory: GuessResult[] = [
    { guess: 50, feedback: 'too-high', attemptNumber: 1 },
    { guess: 25, feedback: 'too-low', attemptNumber: 2 },
    { guess: 37, feedback: 'too-high', attemptNumber: 3 },
  ];

  it('should display attempts correctly', () => {
    render(
      <GameStats 
        attempts={3} 
        maxAttempts={10} 
        guessHistory={mockGuessHistory} 
      />
    );
    
    expect(screen.getByText('Attempts: 3/10')).toBeInTheDocument();
    expect(screen.getByText('7 attempts remaining')).toBeInTheDocument();
  });

  it('should display guess history when available', () => {
    render(
      <GameStats 
        attempts={3} 
        maxAttempts={10} 
        guessHistory={mockGuessHistory} 
      />
    );
    
    expect(screen.getByText('Guess History')).toBeInTheDocument();
    expect(screen.getByText('#3: 37')).toBeInTheDocument();
    expect(screen.getByText('#2: 25')).toBeInTheDocument();
    expect(screen.getByText('#1: 50')).toBeInTheDocument();
  });

  it('should display encouragement message', () => {
    render(
      <GameStats 
        attempts={3} 
        maxAttempts={10} 
        guessHistory={mockGuessHistory} 
      />
    );
    
    expect(screen.getByText(/You've got this!/)).toBeInTheDocument();
  });

  it('should not display guess history when empty', () => {
    render(
      <GameStats 
        attempts={0} 
        maxAttempts={10} 
        guessHistory={[]} 
      />
    );
    
    expect(screen.queryByText('Guess History')).not.toBeInTheDocument();
  });
});