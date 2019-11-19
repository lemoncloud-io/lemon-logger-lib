import app from '../../../src/app';
import request from 'supertest';

describe('hello', () => {
    it('should be tested on hello', () => {
        const a = 'hello';
        expect(a).toBe('hello');
    });

    it('It should response the GET method', done => {
        request(app)
            .get('/')
            .then((res: any) => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});
