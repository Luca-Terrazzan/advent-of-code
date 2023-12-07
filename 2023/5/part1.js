import { parseInputFile } from '../utils.js';

let currentSeeds;
let currentStep = 'seed'

function parseInitialSeeds(seedsLine) {
  const [_, seedsListAsString] = seedsLine.split(': ')
  currentSeeds = seedsListAsString.split(' ')
}

function parseGameLine(line) {
  if (!line) {
    // ignore empty lines
    return
  }
  if (line.startsWith('seeds:')) {
    // first line, just parse the seeds list
    parseInitialSeeds(line)
    return
  }
  if (line.startsWith(currentStep)) {
    // a map line header, get the next step
    line.replace(' map:', '')
    line.replace(currentStep+'-to-')
    currentStep = line
    return
  }
  // otherwise, we are reading a map numbers list for the current step
}

// parseInputFile('./2023/5/input.txt', parseGameLine, line => console.log('Total points: ', totalPoints))
parseInputFile('./2023/5/sample_input.txt', parseGameLine, line => console.log('Test', currentSeeds))
