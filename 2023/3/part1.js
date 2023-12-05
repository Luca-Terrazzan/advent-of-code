
import { isNumber, parseInputFile } from '../utils.js';

let totalPoints = 0

const SPACE_CHAR = '.'

function parseGame(line) {
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === SPACE_CHAR) continue
    if (isNumber(char)) {
      console.log('Char ', char, ' is a number')
    } else (
      console.log('Char ', char, ' is a symbol')
    )
  }
}

parseInputFile('./2023/3/sample_input.txt', parseGame, line => console.log('Total points: ', totalPoints))
// parseInputFile('./2023/3/input.txt', parseGame, line => console.log('Total points: ', totalPoints))
