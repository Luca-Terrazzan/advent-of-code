import { parseInputFile } from '../utils.js';

let totalZeroClicks = 0;
let currentPosition = 50;
let clickOccurred = 0;

function parseGame(gameTextLine) {
  [currentPosition, clickOccurred] = updatePosition(gameTextLine);
  console.log('Current Position: ', currentPosition);
  totalZeroClicks += clickOccurred;
}

function updatePosition(movementTextLine) {
  const direction = movementTextLine[0];
  const amount = parseInt(movementTextLine.slice(1));
  if (amount > 99) {
    console.debug('Amount greater than 99:', amount);
  }
  let clicks = 0;
  let newPosition = currentPosition;
  
  if (direction === 'L') {
    newPosition = currentPosition - amount
    clicks = Math.floor(newPosition / -100)
    if (newPosition < 0) newPosition = newPosition % 100 + 100;
  } else {
    newPosition = currentPosition + amount;
    clicks = Math.floor(newPosition / 100)
    if (newPosition > 99) newPosition = newPosition % 100;
  }

  return [newPosition, clicks];
}

parseInputFile('2025/1/input.txt', parseGame, line => console.log('Total zero positions: ', totalZeroClicks))
