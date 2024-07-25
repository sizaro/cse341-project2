const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('Main Routes', () => {
    test('GET / should render the home page', async () => {
        const res = await request.get('/');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    });
});
