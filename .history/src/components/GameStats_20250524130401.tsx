import React from 'react';
import { GuessResult } from '../types/game.types';
import { formatAttempts, getEncouragementMessage } from '../utils/gameUtils';

interface GameStatsProps {
  attempts: number;
  maxAttempts: number;
  guessHistory: GuessResult[];
}

export const GameStats: React.FC<GameStatsProps> = ({ attempts, maxAttempts, guessHistory }) => {
  const attemptsLeft = maxAttempts - attempts;
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800">
          Attempts: {formatAttempts(attempts, maxAttempts)}
        </div>
        <div className="text-lg text-gray-600">
          {attemptsLeft} attempts remaining
        </div>
        <div className="text-sm text-blue-600 font-medium">
          {getEncouragementMessage(attemptsLeft)}
        </div>
      </div>

      {guessHistory.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Guess History</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {guessHistory.slice().reverse().map((result, index) => (
              <div
                key={guessHistory.length - index}
                className={`flex justify-between items-center p-2 rounded ${
                  result.feedback === 'too-high' 
                    ? 'bg-red-100 text-red-700'
                    : result.feedback === 'too-low'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                <span className="font-medium">#{result.attemptNumber}: {result.guess}</span>
                <span className="text-sm">
                  {result.feedback === 'too-high' && '📉 Too High'}
                  {result.feedback === 'too-low' && '📈 Too Low'}
                  {result.feedback === 'correct' && '🎯 Correct!'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};