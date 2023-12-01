const fs = require('fs');
const readline = require('readline');

function getLineNumber(line) {
  let tot = getFirstNumber(line) + getLastNumber(line)

  return tot
}

function getFirstNumber(line) {
  for (const char of line) {
    if (!isNaN(+char)) {
      return char
    }
  }
}

function getLastNumber(line) {
  for (let i = line.length - 1; i >= 0; i--) {
    if (!isNaN(+line[i])) {
      return line[i]
    }
  }
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
