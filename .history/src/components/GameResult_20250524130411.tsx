import React from 'react';

interface GameResultProps {
  gameStatus: 'won' | 'lost';
  attempts: number;
  secretNumber: number;
  onPlayAgain: () => void;
}

export const GameResult: React.FC<GameResultProps> = ({ 
  gameStatus, 
  attempts, 
  secretNumber, 
  onPlayAgain 
}) => {
  const isWin = gameStatus === 'won';
  
  return (
    <div className={`text-center p-8 rounded-lg ${isWin ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="text-6xl mb-4">
        {isWin ? '🎉' : '😞'}
      </div>
      
      <h2 className={`text-3xl font-bold mb-4 ${isWin ? 'text-green-600' : 'text-red-600'}`}>
        {isWin ? 'Congratulations!' : 'Game Over!'}
      </h2>
      
      <p className="text-lg text-gray-700 mb-2">
        The secret number was <strong>{secretNumber}</strong>
      </p>
      
      {isWin ? (
        <p className="text-lg text-gray-700 mb-6">
          You guessed it in <strong>{attempts}</strong> attempt{attempts !== 1 ? 's' : ''}!
        </p>
      ) : (
        <p className="text-lg text-gray-700 mb-6">
          Better luck next time!
        </p>
      )}
      
      <button
        onClick={onPlayAgain}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
      >
        Play Again
      </button>
    </div>
  );
};