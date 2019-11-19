import { sayHello } from './sayHello';

describe('Test sayHello', () => {
    it('It should say Hello test', () => {
        expect(sayHello('test')).toBe('Hello test');
        expect(sayHello('louis')).toBe('Hello louis');
    });
});
