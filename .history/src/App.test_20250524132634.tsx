import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Fix the import path - we're in src/, so utils is ./utils/
jest.mock('./utils/gameUtils', () => ({
  ...jest.requireActual('./utils/gameUtils'),
  generateRandomNumber: jest.fn(() => 42),
}));

describe('App Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    
    // Should show game interface - use more flexible text matching
    expect(screen.getByText(/Difficulty:/)).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your guess/)).toBeInTheDocument();
    expect(screen.getByText('Guess!')).toBeInTheDocument();
    expect(screen.getByText(/Attempts:/)).toBeInTheDocument();
    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('should handle a complete game flow - winning', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    // Make correct guess (mocked to be 42)
    const input = screen.getByPlaceholderText(/Enter your guess/);
    const guessButton = screen.getByText('Guess!');
    
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.click(guessButton);
    
    // Should show win screen
    await waitFor(() => {
      expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('secret-number')).toHaveTextContent('The secret number was 42');
    expect(screen.getByTestId('attempts-message')).toHaveTextContent('You guessed it in 1 attempt!');
  });

  it('should handle game flow - wrong guess', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    // Make wrong guess (75 > 42, should be "too high")
    const input = screen.getByPlaceholderText(/Enter your guess/);
    const guessButton = screen.getByText('Guess!');
    
    fireEvent.change(input, { target: { value: '75' } });
    fireEvent.click(guessButton);
    
    // Should show feedback and continue game
    await waitFor(() => {
      expect(screen.getByText(/Attempts:/)).toBeInTheDocument();
      expect(screen.getByText('1/10')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Guess History')).toBeInTheDocument();
    expect(screen.getByText(/#1:/)).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    // 75 > 42, so should be "Too High"
    expect(screen.getByText(/Too High/)).toBeInTheDocument();
  });

  it('should allow returning to menu and playing again', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    // Go back to menu - use the actual text we have
    fireEvent.click(screen.getByText('Restart Game'));
    
    // Should show difficulty selector again
    await waitFor(() => {
      expect(screen.getByText('Easy')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });
  });

  it('should handle play again from win screen', async () => {
    render(<App />);
    
    // Start and win game
    fireEvent.click(screen.getByText('Medium'));
    const input = screen.getByPlaceholderText(/Enter your guess/);
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.click(screen.getByText('Guess!'));
    
    // Wait for win screen
    await waitFor(() => {
      expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    });
    
    // Click play again
    fireEvent.click(screen.getByText('Play Again'));
    
    // Should be back at difficulty selector
    await waitFor(() => {
      expect(screen.getByText('Easy')).toBeInTheDocument();
    });
  });

  it('should validate input correctly', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    const input = screen.getByPlaceholderText(/Enter your guess/);
    
    // Try invalid input
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.click(guessButton);
    
    // Should show error - wait for it to appear
    await waitFor(() => {
      expect(screen.getByText(/Please enter a number between 1 and 100/)).toBeInTheDocument();
    });
    
    // Attempts should not increase
    expect(screen.getByText(/Attempts:/)).toBeInTheDocument();
    expect(screen.getByText('0/10')).toBeInTheDocument();
  });
  
});