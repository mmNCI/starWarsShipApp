const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

describe('GET /ships', () => {
    it('Aim to return list of ships', async () => {
        const res = await request(app).get('/ships');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
afterAll(async () => {
    await db.close();
});

