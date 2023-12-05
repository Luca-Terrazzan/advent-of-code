import { isNumber, parseInputFile } from '../utils.js';

const GEAR_CHAR = '*'
const GAME_MATRIX = []

function addInputLineToGameMatrix(line) {
  const gameLine = []
  for (const char of line) {
    gameLine.push(char)
  }
  GAME_MATRIX.push(gameLine)
}

function parseGame() {
  let totalPoints = 0
  for (let lineNumber = 0; lineNumber < GAME_MATRIX.length; lineNumber++) {
    const line = GAME_MATRIX[lineNumber]
    for (let charNumber = 0; charNumber < GAME_MATRIX[0].length; charNumber++) {
      const char = line[charNumber]
      if (char === GEAR_CHAR) {
        totalPoints += +findGearRatio(lineNumber, charNumber)
      }
    }
  }

  console.log('Total points: ', totalPoints)
}

function findGearRatio(symLine, symCol) {
  let gearRatio = 1
  let adjacentNumbersAmount = 0
  // Look for the eight spaces around the symbol
  for (let i = Math.max(0, symLine-1); i < Math.min(GAME_MATRIX.length, symLine+2); i++) {
    for (let j = Math.max(0, symCol-1); j < Math.min(GAME_MATRIX[0].length, symCol+2); j++) {
      const char = GAME_MATRIX[i][j]
      if (isNumber(char)) {
        adjacentNumbersAmount++
        const extractedNumber = extractNumberFromPosition(i, j)
        gearRatio *= +extractedNumber
      }
    }
  }

  return adjacentNumbersAmount === 2 ? gearRatio : 0
}

function extractNumberFromPosition(numLine, numCol) {
  let finalNumber = ''+GAME_MATRIX[numLine][numCol]
  GAME_MATRIX[numLine][numCol] = '.'

  for (let shift = 1; true; shift++) {
    let char = GAME_MATRIX[numLine][numCol+shift]
    if (isNumber(char)) {
      finalNumber += ''+char
      GAME_MATRIX[numLine][numCol+shift] = '.'
    } else {
      break
    }
  }
  for (let shift = 1; true; shift++) {
    let char = GAME_MATRIX[numLine][numCol-shift]
    if (isNumber(char)) {
      finalNumber = ''+char + finalNumber
      GAME_MATRIX[numLine][numCol-shift] = '.'
    } else {
      break
    }
  }

  return finalNumber
}

// parseInputFile('./2023/3/sample_input.txt', addInputLineToGameMatrix, parseGame)
parseInputFile('./2023/3/input.txt', addInputLineToGameMatrix, parseGame)
