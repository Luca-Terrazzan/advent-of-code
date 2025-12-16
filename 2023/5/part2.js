import { parseInputFile } from '../utils.js';

let currentSeeds;
let newSeeds;
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
    currentStep = currentStep.replace(previousStep + '-to-', '')
    console.log('Current step is', currentStep)
    return
  }
  // otherwise, we are reading a map numbers list for the current step
  parseMappingLine(line)
}

function parseMappingLine(line) {
  const [seedEnd, seedStart, step] = line.split` `.map(x => +x)
  stepMap.push({ seedStart, step, seedEnd })
}

function updateSeeds() {
  let seedsAmount = currentSeeds.length
  for (let i = 0; i < seedsAmount; i += 2) {
    const seedStart = currentSeeds[i]
    const seedIntervalLength = currentSeeds[i + 1]
    const seedEnd = seedStart + seedIntervalLength
    for (const mapping of stepMap) {
      // Seed interval is fully outside the mapping interval, don't do anything
      if (seedEnd < mapping.seedStart) continue
      if (seedStart > mapping.seedStart + mapping.step) continue
      // Seed interval is fully inside the mapping interval, transform the seed interval
      if (seedStart >= mapping.seedStart && seedEnd <= mapping.seedStart + mapping.step) {
        // transform the whole interval
        currentSeeds[i] = mapping.seedEnd + (seedStart - mapping.seedStart)
        continue
      }
      // Seed is partially inside the mapping interval, transform the part inside
      // but keep the rest as a new seeds interval
      // Update the current interval
      currentSeeds[i] = mapping.seedEnd + (seedStart - mapping.seedStart)
      currentSeeds[i + 1] = mapping.seedStart + mapping.step - seedStart
      // Create a new interval and add it to the seeds list
      const newSeedStart = mapping.seedStart + currentSeeds[i+1] + 1
      const newSeedInterval = seedEnd - (mapping.seedStart + mapping.step)
      // Add the new seed interval
      currentSeeds.push(newSeedStart)
      currentSeeds.push(newSeedInterval)
      seedsAmount += 2
    }
  }

  stepMap = []
}

function printResult() {
  updateSeeds()
  const lowestPosition = Math.min(...currentSeeds)
  console.log('Lowest final position is ', lowestPosition)
}

parseInputFile('./2023/5/sample_input.txt', parseGameLine, line => printResult())
// parseInputFile('./2023/5/input.txt', parseGameLine, line => printResult())
