import "../../src/setup"
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, createTestSong } from "../factories/bodyFactory"
import { connection } from "../../src/database";


describe("POST /recommendations/:id/upvote", () => {
    it("should answer status 200 for valid params", async () => {
        await createTestSong()
        const response = await supertest(app).post("/recommendations/1/upvote")
        expect(response.status).toBe(200);
    })
    it("should answer status 404 for not existing song", async () => {
        const response = await supertest(app).post("/recommendations/5000/upvote")
        expect(response.status).toBe(404);
    })
})

describe("POST /recommendations/:id/downvote", () => {
    it("should answer status 200 for valid params", async () => {
        const response = await supertest(app).post("/recommendations/1/downvote")
        expect(response.status).toBe(200);
    })
    it("should answer status 404 for not existing song", async () => {
        const response = await supertest(app).post("/recommendations/5000/downvote")
        expect(response.status).toBe(404);
    })
})

afterAll(async () => {
    await clearDatabase()
    await connection.end()
})