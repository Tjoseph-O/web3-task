import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GuessInput } from '../../components/GuessInput';

describe('GuessInput', () => {
  const mockOnGuess = jest.fn();
  const mockOnGuessChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render input field and button', () => {
    render(
      <GuessInput 
        onGuess={mockOnGuess} 
        currentGuess="" 
        onGuessChange={mockOnGuessChange} 
      />
    );
    
    expect(screen.getByPlaceholderText(/Enter your guess/)).toBeInTheDocument();
    expect(screen.getByText('Guess!')).toBeInTheDocument();
  });

  it('should call onGuessChange when input value changes', () => {
    render(
      <GuessInput 
        onGuess={mockOnGuess} 
        currentGuess="" 
        onGuessChange={mockOnGuessChange} 
      />
    );
    
    const input = screen.getByPlaceholderText(/Enter your guess/);
    fireEvent.change(input, { target: { value: '50' } });
    
    expect(mockOnGuessChange).toHaveBeenCalledWith('50');
  });

  it('should call onGuess when form is submitted with valid number', () => {
    render(
      <GuessInput 
        onGuess={mockOnGuess} 
        currentGuess="50" 
        onGuessChange={mockOnGuessChange} 
      />
    );
    
    const form = screen.getByRole('button').closest('form');
    fireEvent.submit(form!);
    
    expect(mockOnGuess).toHaveBeenCalledWith('50');
  });

  it('should disable input and button when disabled prop is true', () => {
    render(
      <GuessInput 
        onGuess={mockOnGuess} 
        currentGuess="" 
        onGuessChange={mockOnGuessChange} 
        disabled={true}
      />
    );
    
    expect(screen.getByPlaceholderText(/Enter your guess/)).toBeDisabled();
    expect(screen.getByText('Guess!')).toBeDisabled();
  });
});