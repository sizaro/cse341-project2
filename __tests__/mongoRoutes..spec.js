
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('MongoDB Routes', () => {
    let connection;
    let db;
    let testUserId;
    const userCollection = 'Math256';

    beforeAll(async () => {
        jest.setTimeout(90000);
        // Initialize MongoDB connection
        connection = await MongoClient.connect(process.env.MONGODB_URL);
        db = connection.db(); 

        // Insert a test user
        const result = await db.collection(userCollection).insertOne({
        "firstname": "Tom",
        "lastname": "Cruise",
        "birthdate": "07/03/1962",
        "country": "USA",
        "email": "tomcruise@test.com",
        "photo": "img/jpg",
        "major": "English",
        "password": "hush-pswd",
        "phone": "+18088782722"
        });
        testUserId = result.insertedId;
    });

    afterAll(async () => {
        // Clean up the test user
        if (db) {
            await db.collection(userCollection).deleteOne({ _id: testUserId });
        }
        if (connection) {
            await connection.close();
        }
    });

    test('GET /math should return all math members', async () => {
        const res = await request.get('/math');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.statusCode).toBe(200);
    });

    
    test('GET /math/:id should return the a single math member', async () => {
    const res = await request.get(`/math/${testUserId}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8')
    expect(res.statusCode).toBe(200);

});
});

/*
test('POST /users should create a new user', async () => {
    const res = await request.post('/users').send({
        username: 'newuser',
        email: 'new@example.com',
        password: 'newpassword'
    });
    expect(res.statusCode).toBe(201);
});

test('PUT /users/:id should update the user', async () => {
    const res = await request.put(`/users/${testUserId}`).send({
        username: 'updateduser',
        email: 'updated@example.com',
        password: 'updatedpassword'
    });
    expect(res.statusCode).toBe(204);
});

test('DELETE /users/:id should delete the user', async () => {
    const res = await request.delete(`/users/${testUserId}`);
    expect(res.statusCode).toBe(204);
});
*/
