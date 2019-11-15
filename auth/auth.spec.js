const db = require('../database/dbConfig');
const request = require('supertest');
const router = require('./auth-router');
const { add } = require('./authModel');
const { find } = require('./authModel');

describe('auth model', function() {
    describe('add()', function() {
        beforeEach(async () => {
            await db("users").truncate();
        });

        it('should add a user', async function() {
            await add({ username: 'sam', password: 'samuel' });

            const user = await db("users");
            expect(user).toHaveLength(1); 
        });

        it('should add the provided user', async function() {
            await add({ username: 'sam', password: 'samuel' });

            const user = await db("users");

            expect(user).toHaveLength(1);
            expect(user[0].username).toBe('sam');

        });
    });
});

describe('auth model', function() {
    describe('find()', function() {
        beforeEach(async () => {
            await db("users").truncate();
        });

        it('should add a user', async function() {
            await add({ username: 'sam', password: 'samuel' });
            await find({ username: 'sam', password: 'samuel' });

            const user = await db("users");
            expect(user).toHaveLength(1); 
        });

        it('should find the provided user', async function() {
            await add({ username: 'sam', password: 'samuel' });
            await find({ username: 'sam', password: 'samuel' });

            const user = await db("users");

            expect(user).toHaveLength(1);
            expect(user[0].username).toBe('sam');

        });
    });
});