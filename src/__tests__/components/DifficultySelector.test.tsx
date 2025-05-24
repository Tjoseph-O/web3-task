import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DifficultySelector } from '../../components/DifficultySelector';

describe('DifficultySelector', () => {
  const mockOnSelectDifficulty = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all difficulty options', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);
    
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Hard')).toBeInTheDocument();
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });

  it('should display correct attempt counts for each difficulty', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);
    
    expect(screen.getByText('15 attempts')).toBeInTheDocument();
    expect(screen.getByText('10 attempts')).toBeInTheDocument();
    expect(screen.getByText('7 attempts')).toBeInTheDocument();
    expect(screen.getByText('5 attempts')).toBeInTheDocument();
  });

  it('should call onSelectDifficulty when a difficulty is clicked', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);
    
    fireEvent.click(screen.getByText('Medium'));
    
    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('medium');
  });

  it('should render game title and description', () => {
    render(<DifficultySelector onSelectDifficulty={mockOnSelectDifficulty} />);
    
    expect(screen.getByText('Number Guesser Game')).toBeInTheDocument();
    expect(screen.getByText(/I'm thinking of a number between 1 and 100/)).toBeInTheDocument();
  });
});