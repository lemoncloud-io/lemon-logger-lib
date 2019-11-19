/**
 * Sum of array
 *
 * ### Example (es module)
 * ```js
 * import { sum } from 'lemon-typescript-template'
 * console.log(sum([1,2,3,4,5]))
 * // => 15
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var sum = require('lemon-typescript-template').sum;
 * console.log(sum([1,2,3,4,5]))
 * // => 15
 * ```
 *
 * @param         list(array)
 * @returns       total sum value of list
 * @anotherNote   test note
 */
export function sum(list: number[]): number {
    return list.reduce((acc, val) => acc + val);
}
