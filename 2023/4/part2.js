import { parseInputFile } from '../utils.js';

let totalPoints = 0
let multipliers = [1]

function parseGameLine(line) {
  const currentMultiplier = multipliers[0]
  totalPoints += currentMultiplier

  const amountOfWins = getAmountOfWinsPerLine(line)
  if (amountOfWins === 0) {
    multipliers[1] = multipliers[1] || 1
  }

  for (let i = 0; i < amountOfWins; i++) {
    multipliers[i+1] = (multipliers[i+1] || 1) + currentMultiplier
  }

  multipliers.shift()
}

function getAmountOfWinsPerLine(line) {
  const [_, cardContent] = line.replaceAll('  ', ' ').split(': ')
  const [winningNumbersString, numbersString] = cardContent.split(' | ')

  const winningNumbers = winningNumbersString.split(' ')
  const cardNumbers = numbersString.split(' ')

  let amountOfWins = 0

  for (const winningNumber of winningNumbers) {
    if (cardNumbers.includes(winningNumber)) {
      amountOfWins++
    }
  }

  return amountOfWins
}

parseInputFile('./2023/4/input.txt', parseGameLine, line => console.log('Total points: ', totalPoints))
// parseInputFile('./2023/4/sample_input.txt', parseGameLine, line => console.log('Total points: ', totalPoints))
