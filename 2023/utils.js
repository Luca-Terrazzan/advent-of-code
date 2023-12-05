import * as fs from 'fs'
import * as readline from 'readline'

export function parseInputFile(path, onLine, onClose) {
  const inputStream = fs.createReadStream(path);
  let lineReader = readline.createInterface({
    input: inputStream,
    terminal: false,
  });
  lineReader.on('line', onLine);
  lineReader.on('close', onClose)
}

export function isNumber(char) {
  return !isNaN(+char)
}
