const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");

describe("root", () => {
    TextDecoderStream("environment should be testing", () => {
        expect(process.env.DB_ENV).tobe("testing");
    });
});