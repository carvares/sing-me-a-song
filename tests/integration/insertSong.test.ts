import "../../src/setup"
import supertest from "supertest";
import app from "../../src/app";
import faker from "faker";
import { connection } from "../../src/database";


describe("POST /recommendations", () => {
  it("should answer status 201 for valid params", async () => {
    const response = await supertest(app).post("/recommendations")
      .send({ name: faker.random.word(), youtubeLink: faker.internet.url() })
    expect(response.status).toBe(201);
  });

  it("should answer status 400 for invalid music name", async () => {
    const response = await supertest(app).post("/recommendations")
      .send({ name: "", youtubeLink: faker.internet.url() })
    expect(response.status).toBe(400);
  });

  it("should answer status 400 for invalid music url", async () => {
    const response = await supertest(app).post("/recommendations")
      .send({ name: faker.random.word(), youtubeLink: "" })
    expect(response.status).toBe(400);
  });
  it("should answer status 400 for invalid music name and url", async () => {
    const response = await supertest(app).post("/recommendations")
      .send({ name: "", youtubeLink: "" })
    expect(response.status).toBe(400);
  });
});


afterAll(async () => {
  await connection.end()
})
