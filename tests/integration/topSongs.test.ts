import "../../src/setup"
import supertest from "supertest";
import app from "../../src/app";
import { clearDatabase, createTestSong } from "../factories/bodyFactory"
import { connection } from "../../src/database";

describe("get /recommendations/top/:amount", () => {
    it("should answer status 200 if database contains a song", async () => {
        await createTestSong();
        const response = await supertest(app).get("/recommendations/top/100")
        expect(response.status).toBe(200);
    })
    it("should answer status 404 for not existing songs", async () => {
        await clearDatabase();
        const response = await supertest(app).get("/recommendations/random")
        expect(response.status).toBe(404);
    })
})

afterAll(async () => {
    await clearDatabase()
    await connection.end()
})