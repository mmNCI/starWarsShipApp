const request = require('supertest');
const app = require('../../app');
const db = require('../../db');


//GET 
describe('GET /ships', () => {
    it('should return list of ships', async () => {
        const res = await request(app).get('/ships');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

//POST
describe('POST /ships', () => {
    it('should create new ship', async () => {
        const newShip = {
            name: 'Test Ship',
            shipType: 'Type A',
            faction: 'The Good Side',
            appeared: 'Generic Movie (Generic Year)'
        };
        const res = await request(app).post('/ships').send(newShip).set('Accept', 'application/json');

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newShip.name);
        expect(res.body.shipType).toBe(newShip.shipType);
        expect(res.body.faction).toBe(newShip.faction);
        expect(res.body.appeared).toBe(newShip.appeared);

    });
});

//PUT
describe('PUT /ships/:id', () => {
    it('should update ship', async () => {
        const updatedShip = {
            name: 'Test Ship',
            shipType: 'Type B',
            faction: 'The Bad Side',
            appeared: 'Generic Movie (Generic Year)'
        };
        const res = await request(app).put('/ships/1').send(updatedShip).set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/updated/i);

    });
});






afterAll(() => {
    db.close();
});

