import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Integration', () => {
  it('should render difficulty selector on initial load', () => {
    render(<App />);
    
    expect(screen.getByText('Number Guesser Game')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });

  it('should start a game when difficulty is selected', () => {
    render(<App />);
    
    // Click Medium difficulty
    fireEvent.click(screen.getByText('Medium'));
    
    // Should show game interface
    expect(screen.getByText(/Difficulty:/)).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your guess/)).toBeInTheDocument();
    expect(screen.getByText('Guess!')).toBeInTheDocument();
    expect(screen.getByText(/Attempts:/)).toBeInTheDocument();
    // Check for the parts separately since they're in different elements
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
  });

  it('should handle input and guessing', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    // Make a guess
    const input = screen.getByPlaceholderText(/Enter your guess/);
    const guessButton = screen.getByText('Guess!');
    
    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.click(guessButton);
    
    // Should show that an attempt was made
    await waitFor(() => {
      expect(screen.getByText(/Attempts:/)).toBeInTheDocument();
      // Should have made 1 attempt
      expect(screen.getByText('1')).toBeInTheDocument();
    });
    
    // Should show guess history
    expect(screen.getByText('Guess History')).toBeInTheDocument();
  });

  it('should allow game restart', () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    // Click restart
    fireEvent.click(screen.getByText('Restart Game'));
    
    // Should be back at difficulty selection
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('should validate input correctly', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    const input = screen.getByPlaceholderText(/Enter your guess/);
    const guessButton = screen.getByText('Guess!');
    
    // Try invalid input
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.click(guessButton);
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Please enter a number between 1 and 100/)).toBeInTheDocument();
    });
    
    // Attempts should not increase (still 0)
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});