import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameResult } from '../../components/GameResult';

describe('GameResult', () => {
  const mockOnPlayAgain = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display win message when game is won', () => {
    render(
      <GameResult 
        gameStatus="won" 
        attempts={5} 
        secretNumber={42} 
        onPlayAgain={mockOnPlayAgain} 
      />
    );
    
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    // Use more flexible text matching for broken-up text
    expect(screen.getByText(/You guessed it in/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
    expect(screen.getByText(/attempt/)).toBeInTheDocument();
    expect(screen.getByText(/The secret number was/)).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should display loss message when game is lost', () => {
    render(
      <GameResult 
        gameStatus="lost" 
        attempts={10} 
        secretNumber={42} 
        onPlayAgain={mockOnPlayAgain} 
      />
    );
    
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    expect(screen.getByText('Better luck next time!')).toBeInTheDocument();
    expect(screen.getByText(/The secret number was/)).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should call onPlayAgain when play again button is clicked', () => {
    render(
      <GameResult 
        gameStatus="won" 
        attempts={5} 
        secretNumber={42} 
        onPlayAgain={mockOnPlayAgain} 
      />
    );
    
    fireEvent.click(screen.getByText('Play Again'));
    
    expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
  });

  it('should handle singular attempt correctly', () => {
    render(
      <GameResult 
        gameStatus="won" 
        attempts={1} 
        secretNumber={42} 
        onPlayAgain={mockOnPlayAgain} 
      />
    );
    
    // Should show "attempt" not "attempts" for singular
    expect(screen.getByText(/You guessed it in/)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/attempt!/)).toBeInTheDocument();
  });
});