
import { 
    generateRandomNumber, 
    validateGuess, 
    formatAttempts, 
    getEncouragementMessage, 
    getFeedbackMessage 
  } from '../../utils/gameUtils';
  
  describe('gameUtils', () => {
    describe('generateRandomNumber', () => {
      it('should generate a number within the specified range', () => {
        const min = 1;
        const max = 100;
        const result = generateRandomNumber(min, max);
        
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(Number.isInteger(result)).toBe(true);
      });
  
      it('should generate different numbers on multiple calls', () => {
        const numbers = Array.from({ length: 10 }, () => generateRandomNumber(1, 100));
        const uniqueNumbers = new Set(numbers);
        
        expect(uniqueNumbers.size).toBeGreaterThan(1);
      });
  
      it('should handle single number range', () => {
        const result = generateRandomNumber(5, 5);
        expect(result).toBe(5);
      });
    });
  
    describe('validateGuess', () => {
      it('should return true for valid numbers within range', () => {
        expect(validateGuess(50, 1, 100)).toBe(true);
        expect(validateGuess(1, 1, 100)).toBe(true);
        expect(validateGuess(100, 1, 100)).toBe(true);
      });
  
      it('should return false for numbers outside range', () => {
        expect(validateGuess(0, 1, 100)).toBe(false);
        expect(validateGuess(101, 1, 100)).toBe(false);
        expect(validateGuess(-5, 1, 100)).toBe(false);
      });
  
      it('should return false for invalid numbers', () => {
        expect(validateGuess(NaN, 1, 100)).toBe(false);
        expect(validateGuess(Infinity, 1, 100)).toBe(false);
        expect(validateGuess(-Infinity, 1, 100)).toBe(false);
      });
    });
  
    describe('formatAttempts', () => {
      it('should format attempts correctly', () => {
        expect(formatAttempts(5, 10)).toBe('5/10');
        expect(formatAttempts(0, 15)).toBe('0/15');
        expect(formatAttempts(7, 7)).toBe('7/7');
      });
    });
  
    describe('getEncouragementMessage', () => {
      it('should return appropriate messages based on attempts left', () => {
        expect(getEncouragementMessage(10)).toBe("You've got this! 🎯");
        expect(getEncouragementMessage(4)).toBe("Getting closer! 🔥");
        expect(getEncouragementMessage(2)).toBe("Almost there! 💪");
        expect(getEncouragementMessage(1)).toBe("Last chance! 🚀");
      });
    });
  
    describe('getFeedbackMessage', () => {
      it('should return correct feedback messages', () => {
        expect(getFeedbackMessage('too-high', 75)).toBe('75 is too high! Try lower. 📉');
        expect(getFeedbackMessage('too-low', 25)).toBe('25 is too low! Try higher. 📈');
        expect(getFeedbackMessage('correct', 50)).toBe('🎉 Correct! 50 is the secret number!');
      });
    });
  });