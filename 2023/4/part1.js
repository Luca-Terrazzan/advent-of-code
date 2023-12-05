
import { parseInputFile } from '../utils.js';

let totalPoints = 0

function parseGameLine(line) {
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

  totalPoints += amountOfWins > 0 ? Math.pow(2, amountOfWins - 1) : 0
}

parseInputFile('./2023/4/input.txt', parseGameLine, line => console.log('Total points: ', totalPoints))
// parseInputFile('./2023/4/sample_input.txt', parseGameLine, line => console.log('Total points: ', totalPoints))
