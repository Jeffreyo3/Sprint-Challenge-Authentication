const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");


describe('server.js', () => {
    test('should be the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
})


test("registers user successfully with a 201 response", async () => {
    await db.seed.run();
    const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "michael", password: "coolpassword" });

    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
});