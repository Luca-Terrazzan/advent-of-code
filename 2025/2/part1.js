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
    if (id.length % 2 !== 0) {
        return 0;
    }
    const partA = id.slice(0, id.length / 2);
    const partB = id.slice(id.length / 2);
    if (partA === partB) {
        console.log('Found invalid id: ', id);
    }
    return partA === partB ? +id : 0;
}

parseInputFile('2025/2/input.txt', parseGame, line => console.log('Total sum of invalid ids: ', totalZeroPositions))
