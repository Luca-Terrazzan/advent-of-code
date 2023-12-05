
import { isNumber, parseInputFile } from '../utils.js';

let totalPoints = 0

const SPACE_CHAR = '.'
const GAME_MATRIX = []

function addInputLineToGameMatrix(line) {
  const gameLine = []
  for (const char of line) {
    gameLine.push(char)
  }
  GAME_MATRIX.push(gameLine)
}

function parseGame() {
  for (let lineNumber = 0; lineNumber < GAME_MATRIX.length; lineNumber++) {
    const line = GAME_MATRIX[lineNumber]
    for (let charNumber = 0; charNumber < GAME_MATRIX[0].length; charNumber++) {
      const char = line[charNumber]
      if (char === SPACE_CHAR) continue
      if (isNumber(char)) {
        console.log('Char ', char, ' is a number')
      } else {
        console.log('Char ', char, ' is a symbol')
        findNumbersAdjacentToSymbol(lineNumber, charNumber)
      }
    }
  }

  console.log('Total points: ')
}

function findNumbersAdjacentToSymbol(symLine, symCol) {
  const symbol = GAME_MATRIX[symLine][symCol]
  console.log('Scanning around symbol ', symbol, ' at pos: ', symLine, symCol)
  // Look for the eight spaces around the symbol
  for (let i = Math.max(0, symLine-1); i < Math.min(GAME_MATRIX.length, symLine+2); i++) {
    for (let j = Math.max(0, symCol-1); j < Math.min(GAME_MATRIX[0].length, symCol+2); j++) {
      console.log(' at pos: ', i, j)
    }
  }
}


parseInputFile('./2023/3/sample_input.txt', addInputLineToGameMatrix, parseGame)
// parseInputFile('./2023/3/input.txt', parseGame, line => console.log('Total points: ', totalPoints))
