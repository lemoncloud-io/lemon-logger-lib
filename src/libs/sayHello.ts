/**
 * Say Hello
 *
 * ### Example (es module)
 * ```js
 * import { sayHello } from 'lemon-typescript-template'
 * console.log(sayHello('test'))
 * // => Hello test
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var sayHello = require('lemon-typescript-template').sayHello;
 * console.log(sayHello('test'))
 * // => Hello test
 * ```
 *
 * @param         string
 * @returns       string with Hello
 * @anotherNote   test note
 */
export const sayHello = (name: string) => `Hello ${name}`;
