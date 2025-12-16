import { parseInputFile } from '../utils.js';

let totalClicks = 0;

class Dial {
  constructor(size, position) {
    this.size = size;
    this.position = position;
  }

  moveLeft() {
    if (this.position === 0) {
      this.position = this.size - 1;
    } else {
      this.position = this.position - 1;
    }
    return this.position === 0;
  }

  moveRight() {
    if (this.position === this.size - 1) {
      this.position = 0;
    } else {
      this.position = this.position + 1;
    }
    return this.position === 0;
  }
}

const dial = new Dial(100, 50);

function parseGame(gameTextLine) {
  updatePosition(gameTextLine);
  console.log('Current Position: ', dial.position);
}

function updatePosition(movementTextLine) {
  const direction = movementTextLine[0];
  const amount = parseInt(movementTextLine.slice(1));
  for (let i = 0; i < amount; i++) {
    if (direction === 'L') {
      if (dial.moveLeft()) {
        totalClicks += 1;
      }
    }
    if (direction === 'R') {
      if (dial.moveRight()) {
        totalClicks += 1;
      }
    }
  }
}

parseInputFile('2025/1/input.txt', parseGame, line => console.log('Total zero positions: ', totalClicks))
