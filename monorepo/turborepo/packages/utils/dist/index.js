"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMax = exports.reverseString = void 0;
function reverseString(str) {
    return str.split('').reverse().join('');
}
exports.reverseString = reverseString;
function findMax(numbers) {
    return Math.max(...numbers);
}
exports.findMax = findMax;
