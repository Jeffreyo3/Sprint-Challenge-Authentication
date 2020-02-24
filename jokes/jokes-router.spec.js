const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("jokes-router GET at /api/jokes", () => {
    let token;
    beforeAll(async () => {
        await db("users").truncate();
        let res = await request(server)
            .post("/api/auth/register")
            .send({ username: "michael2", password: "coolpassword2" });
        token = res.body.token;
    });

    test("Jokes can be retrieved with token from registration with 200 status", async () => {
        let res = await request(server)
            .get("/api/jokes")
            .set("authorization", token);

        expect(res.status).toBe(200);
    });

    test("Jokes cannot be retrieved without token with 401 status", async () => {
        let res = await request(server).get("/api/jokes");

        expect(res.status).toBe(401);
    });
});