import React, { useState } from 'react';

interface GuessInputProps {
  onGuess: (guess: string) => void;
  disabled?: boolean;
  currentGuess: string;
  onGuessChange: (guess: string) => void;
}

export const GuessInput: React.FC<GuessInputProps> = ({ 
  onGuess, 
  disabled = false, 
  currentGuess, 
  onGuessChange 
}) => {
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const num = parseInt(currentGuess);
    if (isNaN(num) || num < 1 || num > 100) {
      setError('Please enter a number between 1 and 100');
      return;
    }
    
    setError('');
    onGuess(currentGuess);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
      onGuessChange(value);
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={currentGuess}
          onChange={handleInputChange}
          placeholder="Enter your guess (1-100)"
          disabled={disabled}
          className="w-full px-4 py-3 text-xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={disabled || !currentGuess}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Guess!
      </button>
    </form>
  );
};