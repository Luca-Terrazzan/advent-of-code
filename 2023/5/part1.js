import { parseInputFile } from '../utils.js';

let currentSeeds;
let currentStep = 'seed'
let stepMap = []

function parseInitialSeeds(seedsLine) {
  const [_, seedsListAsString] = seedsLine.split(': ')
  currentSeeds = seedsListAsString.split` `.map(num => +num)
}

function parseGameLine(line) {
  if (!line) {
    // Empty line, a mapping has finished, update seeds
    updateSeeds()
    return
  }
  if (line.startsWith('seeds:')) {
    // first line, just parse the seeds list
    parseInitialSeeds(line)
    return
  }
  if (line.startsWith(currentStep)) {
    // a map line header, get the next step
    // parsing the current step name is pretty much useless, still... 🤷
    const previousStep = currentStep
    currentStep = line.replace(currentStep, '')
    currentStep = line.replace(' map:', '')
    currentStep = currentStep.replace(previousStep+'-to-', '')
    console.log('Current step is', currentStep)
    return
  }
  // otherwise, we are reading a map numbers list for the current step
  parseMappingLine(line)
}

function parseMappingLine(line) {
  const [seedEnd, seedStart, step] = line.split` `.map(x => +x)
  stepMap.push({seedStart, step, seedEnd})
}

function updateSeeds() {
  for (let i = 0; i < currentSeeds.length; i++) {
    const seed = currentSeeds[i]
    for (const mapping of stepMap) {
      if (seed >= mapping.seedStart && seed <= mapping.seedStart+mapping.step) {
        currentSeeds[i] = mapping.seedEnd + (seed - mapping.seedStart)
      }
    }
  }

  stepMap = []
}

function printResult() {
  updateSeeds()
  const lowestPosition = Math.min(...currentSeeds)
  console.log('Lowest final position is ', lowestPosition)
}

// parseInputFile('./2023/5/sample_input.txt', parseGameLine, line => printResult())
parseInputFile('./2023/5/input.txt', parseGameLine, line => printResult())
