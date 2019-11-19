import app from '../../src/app';
import request from 'supertest';

describe('Test the route path', () => {
    it('It should response the GET method', done => {
        request(app)
            .get('/')
            .then((res: any) => {
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it('It should response 404', done => {
        request(app)
            .get('/should_return_error')
            .then((res: any) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});
