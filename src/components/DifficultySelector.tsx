import React from 'react';
import { DifficultyLevel } from '../types/game.types';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
}

const DIFFICULTY_OPTIONS = [
  { key: 'easy' as DifficultyLevel, name: 'Easy', attempts: 15, color: 'bg-green-500' },
  { key: 'medium' as DifficultyLevel, name: 'Medium', attempts: 10, color: 'bg-yellow-500' },
  { key: 'hard' as DifficultyLevel, name: 'Hard', attempts: 7, color: 'bg-red-500' },
  { key: 'expert' as DifficultyLevel, name: 'Expert', attempts: 5, color: 'bg-purple-500' }
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Number Guesser Game</h1>
      <p className="text-gray-600 mb-8">I'm thinking of a number between 1 and 100...</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
        {DIFFICULTY_OPTIONS.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelectDifficulty(option.key)}
            className={`${option.color} hover:opacity-90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105`}
          >
            <div className="text-lg font-bold">{option.name}</div>
            <div className="text-sm opacity-90">{option.attempts} attempts</div>
          </button>
        ))}
      </div>
    </div>
  );
};