import { parseInputFile } from '../utils.js';

let totalJoltage = 0;

function parseGame(line) {
    // Get the position of the biggest digit excluding the last character
    const digits = line.split('').map(Number);
    let result = '';
    const biggestDigit = Math.max(...digits.slice(0, -1));
    result += biggestDigit;
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] === biggestDigit) {
            result += Math.max(...digits.slice(i+1));
            break;
        }
    }

    console.log('line result', digits, result)
    totalJoltage += +result;
}


parseInputFile('2025/3/input.txt', parseGame, line => console.log('Total sum joltage: ', totalJoltage))
