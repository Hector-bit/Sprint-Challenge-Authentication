const request = require('supertest');

const server = require('./server');

it('should set db envirment to testing', function() {
    expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
    describe("GET /", function() {
        it("should return 200", function() {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });

        it("should return 200", function() {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
        });
    })
})