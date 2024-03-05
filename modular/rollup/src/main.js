import { add, multiply } from './mathUtils.js';
import greet from './greet.js';

const result = add(1, multiply(2, 3));
console.log(greet('Rollup User'));
console.log(`1 + 2 * 3 = ${result}`);
