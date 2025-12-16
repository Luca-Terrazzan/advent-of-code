import { parseInputFile } from '../utils.js';

let totalZeroPositions = 0;

function parseGame(line) {
    const ranges = line.split(',');
    for (const range of ranges) {
        findInvalidIds(range);
    }
}

function findInvalidIds(rangeAsString) {
    const [start, end] = rangeAsString.split('-').map(Number);
    console.log('Processing range: ', start, end);
    for (let id = start; id <= end; id++) {
        totalZeroPositions += isValidId(id.toString());
    }
}

function isValidId(id) {
    for (let i = 1; i <= id.length / 2; i++) {
        const partA = id.slice(0, i);
        const repeatedPart = partA.repeat(id.length / i);
        if (repeatedPart === id) {
            console.log('Found invalid id: ', id);
            return +id;
        }
    }

    return 0;
}

parseInputFile('2025/2/input.txt', parseGame, line => console.log('Total sum of invalid ids: ', totalZeroPositions))
