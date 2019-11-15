const request = require('supertest');

const server = require('../api/server');

it('should set db envirment to testing', function() {
    expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
    describe("GET /", function() {
        it("should return 200", function() {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(res.status);
            });
        });

        // it("should return 200", function() {
        //     //run the server
        //     //make a get request to /
        //     // see that the http code of response is 200
        //     return request(server)
        //     .get('/')
        //     .then(res => {
        //         expect(res.type).toMatch(/json/i);
        //     });
        // });

        // it("should return 200", function() {
        //     //run the server
        //     //make a get request to 
        //     // see that the http code of response is 200
        //     return request(server)
        //     .get('/')
        //     .then(res => {
        //         expect(res.body).toEqual({ api: "" })
        //         expect(res.body.api).toBe("");
        //     })
        // })
    })
})