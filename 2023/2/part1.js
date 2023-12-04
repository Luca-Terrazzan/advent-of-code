import { parseInputFile } from '../utils.js';

const MAX_R = 12
const MAX_G = 13
const MAX_B = 14

let totalPoints = 0

const mapCubeNameToLimit = {
  'red': MAX_R,
  'green': MAX_G,
  'blue': MAX_B
}

function parseGame(gameTextLine) {
  totalPoints += getPointsFromGame(gameTextLine)
}

function getPointsFromGame(gameTextLine) {
  const [gameIdText, gamesText] = gameTextLine.split(':')
  const [_, gameId] = gameIdText.split(' ')
  const cubeSets = gamesText.split(';')
  for (const cubeSet of cubeSets) {
    if (!isCubesetValid(cubeSet)) {
      console.log('!Game ', gameId, ' is invalid')
      return 0
    }
  }

  console.log('Game ', gameId, ' is valid')
  return +gameId
}

function isCubesetValid(cubeSetString) {
  const cubes = cubeSetString.split(', ')
  for (const cubeTypeAndAmount of cubes) {
    const [amount, type] = cubeTypeAndAmount.split(' ')
    if (mapCubeNameToLimit[type] < amount) return false
  }

  return true
}

// parseInputFile('./input_small.txt', parseGame, line => console.log(totalPoints))
// parseInputFile('./sample_input.txt', parseGame, line => console.log(totalPoints))
parseInputFile('./input.txt', parseGame, line => console.log(totalPoints))
