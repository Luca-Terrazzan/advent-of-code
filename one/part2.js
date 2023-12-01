const fs = require("fs");
const readline = require("readline");

const digitsMap = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
}

function getLineNumber(line) {
  let tot = "" + getFirstNumber(line) + getLastNumber(line)

  return tot
}

function getFirstNumber(line) {
  let res = undefined
  let minPosition = Number.MAX_SAFE_INTEGER
  for (const digit of Object.keys(digitsMap)) {
    const digitPosition = line.indexOf(digit)
    if (digitPosition >= 0 && digitPosition < minPosition) {
      minPosition = digitPosition
      res = digitsMap[digit]
    }
  }

  return res
}

function getLastNumber(line) {
  let res = undefined
  let maxPosition = Number.MIN_SAFE_INTEGER
  for (const digit of Object.keys(digitsMap)) {
    const digitPosition = line.lastIndexOf(digit)
    if (digitPosition >= 0 && digitPosition > maxPosition) {
      maxPosition = digitPosition
      res = digitsMap[digit]
    }
  }

  return res
}

let tot = 0
const inputStream = fs.createReadStream('input.txt');
let lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});
lineReader.on('line', function (line) {
  tot += +getLineNumber(line)
});
lineReader.on('close', () => {
  console.log('Total is:', tot)
})
