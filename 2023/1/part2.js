const fs = require('fs');
const readline = require('readline');

/**
 * This maps characters or words we look for in our word to a digit.
 * We will use this to know what firs/second digit to assign a word whenever we find something
 */
const digitsMap = {
  '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
}

/**
 * Given a word, find the first and last digits as per requirements and interpolate them as a string
 */
function getLineNumber(line) {
  let tot = '' + getFirstNumber(line) + getLastNumber(line)

  return tot
}

/**
 * Finds the first valid digit within the word
 * @param {string} line One word to analyze
 */
function getFirstNumber(line) {
  let res = undefined // This will hold the digit
  /**
   * This stores a found digit position. The idea is to find all valid digits and then keep the
   * one with the smallest index in the word (e.g.: the first in the word)
   */
  let minPosition = Number.MAX_SAFE_INTEGER

  // For every digit as number or word
  for (const digit of Object.keys(digitsMap)) {
    // Find if it appears in the word
    const digitPosition = line.indexOf(digit)
    // If it does, and its position is earlier than the current earliest found
    if (digitPosition >= 0 && digitPosition < minPosition) {
      // Save its position as the earliest found
      minPosition = digitPosition
      // Save it as the current candidate for the earliest digit
      res = digitsMap[digit]
    }
  }

  return res
}

/**
 * Finds the last valid digit within the word
 * Pretty much the same as `getFirstNumber()` but with inverted logic
 * @param {string} line One word to analyze
 */
function getLastNumber(line) {
  let res = undefined
  let maxPosition = Number.MIN_SAFE_INTEGER
  for (const digit of Object.keys(digitsMap)) {
    const digitPosition = line.lastIndexOf(digit) // Note: we use `lastIndexOf()` here, since we start from the right
    if (digitPosition >= 0 && digitPosition > maxPosition) {
      maxPosition = digitPosition
      res = digitsMap[digit]
    }
  }

  return res
}

/**
 * Accumulate our sum in here
 */
let tot = 0

/**
 * JS boilerplate to scan a file lines
 */
const inputStream = fs.createReadStream('input.txt');
let lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

/**
 * For every line, get its digits, parse it as number and then add it to our total
 */
lineReader.on('line', function (line) {
  tot += +getLineNumber(line)
});
lineReader.on('close', () => {
  console.log('Total is:', tot)
})
