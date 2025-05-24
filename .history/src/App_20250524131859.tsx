import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { DifficultySelector } from './components/DifficultySelector';
import { GuessInput } from './components/GuessInput';
import { GameStats } from './components/GameStats';
import { GameResult } from './components/GameResult';
import { DifficultyLevel } from './types/game.types';

function App() {
  const { gameState, startGame, makeGuess, resetGame, updateCurrentGuess } = useGameLogic();

  const handleStartGame = (difficulty: DifficultyLevel) => {
    startGame(difficulty);
  };

  const handleGuess = (guess: string) => {
    makeGuess(guess);
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {gameState.gameStatus === 'menu' && (
            <DifficultySelector onSelectDifficulty={handleStartGame} />
          )}

          {gameState.gameStatus === 'playing' && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Number Guesser Game
                </h1>
                <p className="text-gray-600">
                  Difficulty: <span className="font-semibold capitalize">{gameState.difficulty}</span>
                </p>
              </div>

              <GameStats
                attempts={gameState.attempts}
                maxAttempts={gameState.maxAttempts}
                guessHistory={gameState.guessHistory}
              />

              <GuessInput
                onGuess={handleGuess}
                currentGuess={gameState.currentGuess}
                onGuessChange={updateCurrentGuess}
              />

              <div className="text-center">
                <button
                  onClick={handlePlayAgain}
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}

          {(gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') && (
            <GameResult
              gameStatus={gameState.gameStatus}
              attempts={gameState.attempts}
              secretNumber={gameState.secretNumber}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;