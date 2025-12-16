
import { parseInputFile } from '../utils.js';

let totalZeroPositions = 0;
let currentPosition = 50;

function parseGame(gameTextLine) {
  currentPosition = updatePosition(gameTextLine);
  console.log('Current Position: ', currentPosition);
  if (currentPosition === 0) totalZeroPositions++;
}

function updatePosition(movementTextLine) {
  const direction = movementTextLine[0];
  const amount = parseInt(movementTextLine.slice(1));
  
  if (direction === 'L') {
    return (currentPosition - amount) % 100;
  } else {
    return (currentPosition + amount) % 100;
  }
}

parseInputFile('2025/1/input.txt', parseGame, line => console.log('Total zero positions: ', totalZeroPositions))
