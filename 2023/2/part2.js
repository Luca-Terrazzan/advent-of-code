import { parseInputFile } from '../utils.js';

let gamePowersSum = 0

function parseGame(gameTextLine) {
  gamePowersSum += getPowerFromGame(gameTextLine)
}

function getPowerFromGame(gameTextLine) {
  const [_, gamesText] = gameTextLine.split(': ')
  const cubeSets = gamesText.split('; ')

  const minCubeset = {
    r: Number.MIN_SAFE_INTEGER,
    g: Number.MIN_SAFE_INTEGER,
    b: Number.MIN_SAFE_INTEGER,
  }

  for (const cubeSet of cubeSets) {
    const cubeSetObj = getCubesetObj(cubeSet)
    minCubeset.r = Math.max(minCubeset.r, cubeSetObj.r)
    minCubeset.g = Math.max(minCubeset.g, cubeSetObj.g)
    minCubeset.b = Math.max(minCubeset.b, cubeSetObj.b)
  }

  return getCubesetPower(minCubeset)
}

function getCubesetObj(cubeSetString) {
  const cubes = cubeSetString.split(', ')
  const cubeSetObj = {
    r: 0,
    g: 0,
    b: 0
  }
  for (const cubeTypeAndAmount of cubes) {
    const [amount, type] = cubeTypeAndAmount.split(' ')
    switch(type) {
      case 'red': cubeSetObj.r = +amount; break
      case 'green': cubeSetObj.g = +amount; break
      case 'blue': cubeSetObj.b = +amount; break
    }
  }

  return cubeSetObj
}

function getCubesetPower(cubeSetObj) {
  return cubeSetObj.r * cubeSetObj.g * cubeSetObj.b
}

// parseInputFile('./2023/2/input_small.txt', parseGame, line => console.log('Total points: ', gamePowersSum))
// parseInputFile('./2023/2/sample_input.txt', parseGame, line => console.log('Total points: ', gamePowersSum))
parseInputFile('./2023/2/input.txt', parseGame, line => console.log('Total points: ', gamePowersSum))
