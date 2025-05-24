import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Number Guesser Game App', () => {
  test('renders game title and difficulty selection', () => {
    render(<App />);
    
    expect(screen.getByText('Number Guesser Game')).toBeInTheDocument();
    expect(screen.getByText(/I'm thinking of a number between 1 and 100/)).toBeInTheDocument();
    
    // Optional feature: Difficulty levels
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });

  test('starts game when difficulty is selected', () => {
    render(<App />);
    
    // Select difficulty
    fireEvent.click(screen.getByText('Medium'));
    
    // Core requirement: Input interface and attempt tracking
    expect(screen.getByPlaceholderText(/Enter your guess/)).toBeInTheDocument();
    expect(screen.getByText('Guess!')).toBeInTheDocument();
    expect(screen.getByText(/Attempts:/)).toBeInTheDocument();
    expect(screen.getByText(/attempts remaining/)).toBeInTheDocument();
    
    // Check difficulty is displayed
    expect(screen.getByText('medium')).toBeInTheDocument();
    
    // Optional feature: Restart without reload
    expect(screen.getByText('Restart Game')).toBeInTheDocument();
  });

  test('handles game interaction and feedback', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    // Make a guess
    const input = screen.getByPlaceholderText(/Enter your guess/);
    const guessButton = screen.getByText('Guess!');
    
    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.click(guessButton);
    
    // Core requirement: Feedback system
    await waitFor(() => {
      expect(screen.getByText('Guess History')).toBeInTheDocument();
    });
    
    // Should show feedback - use more flexible matching
    expect(screen.getByText(/Too High|Too Low/)).toBeInTheDocument();
    // Check for the guess number using a more flexible approach
    expect(screen.getByText(/#1:/)).toBeInTheDocument();
  });

  test('allows game restart without page reload', () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    // Optional feature: Restart without page reload
    fireEvent.click(screen.getByText('Restart Game'));
    
    // Should return to difficulty selection
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  test('validates input range', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText('Medium'));
    
    const input = screen.getByPlaceholderText(/Enter your guess/);
    
    // Test input validation by trying to enter invalid value
    // The input should prevent invalid values from being entered
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input).toHaveValue(''); // Should be empty due to validation
    
    fireEvent.change(input, { target: { value: '150' } });
    expect(input).toHaveValue(''); // Should be empty due to validation
    
    // Valid input should work
    fireEvent.change(input, { target: { value: '50' } });
    expect(input).toHaveValue('50');
  });
});