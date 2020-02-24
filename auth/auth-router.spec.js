const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");


describe('server.js', () => {
    test('should be the testing environment', () => {
        expect(process.env.DB_ENV).toBe('test');
    });
})


describe('auth-router POST to /register', () => {
    beforeEach(() => {
        db("users").truncate();
    });
    test("registers user successfully with a 201 response", async () => {
        await db.seed.run();
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: "michael", password: "coolpassword" });

        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
    });

    test("register without required data fails with a 400 response", async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ key: "value" });

        expect(res.status).toBe(400);
    });
});

describe('auth-router POST to /login', () => {
    beforeEach(() => {
        db("users").truncate();
    });

    test("login user successful with a 200 response", async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: "michael", password: "coolpassword" });

        expect(res.status).toBe(200);
    });

    test("successful login returns a token", async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: "michael", password: "coolpassword" });

        expect(res.body).toHaveProperty("token");
    })
})

