export const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  export const validateGuess = (guess: number, min: number, max: number): boolean => {
    return !isNaN(guess) && isFinite(guess) && guess >= min && guess <= max;
  };
  
  export const formatAttempts = (attempts: number, maxAttempts: number): string => {
    return `${attempts}/${maxAttempts}`;
  };
  
  export const getEncouragementMessage = (attemptsLeft: number): string => {
    if (attemptsLeft > 5) return "You've got this! 🎯";
    if (attemptsLeft > 3) return "Getting closer! 🔥";
    if (attemptsLeft > 1) return "Almost there! 💪";
    return "Last chance! 🚀";
  };
  
  export const getFeedbackMessage = (
    feedback: 'too-high' | 'too-low' | 'correct',
    guess: number
  ): string => {
    switch (feedback) {
      case 'too-high':
        return `${guess} is too high! Try lower. 📉`;
      case 'too-low':
        return `${guess} is too low! Try higher. 📈`;
      case 'correct':
        return `🎉 Correct! ${guess} is the secret number!`;
      default:
        return '';
    }
  };