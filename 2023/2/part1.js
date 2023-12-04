import { parseInputFile } from '../utils.js';

parseInputFile('./input_small.txt', line => console.log(line), line => console.log('closed'))