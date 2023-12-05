import { parseInputFile } from '../utils.js';

let totalPoints = 0

const mapCubeNameToLimit = {
  'red': 12,
  'green': 13,
  'blue': 14
}

function parseGame(gameTextLine) {
  totalPoints += getPointsFromGame(gameTextLine)
}

function getPointsFromGame(gameTextLine) {
  const [gameIdText, gamesText] = gameTextLine.split(': ')
  const [_, gameId] = gameIdText.split(' ')
  const cubeSets = gamesText.split('; ')
  for (const cubeSet of cubeSets) {
    if (!isCubesetValid(cubeSet)) {
      console.debug('!Game ', gameId, ' is invalid')
      return 0
    }
  }

  console.debug('Game ', gameId, ' is valid')
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
parseInputFile('./2023/2/input.txt', parseGame, line => console.log('Total points: ', totalPoints))
