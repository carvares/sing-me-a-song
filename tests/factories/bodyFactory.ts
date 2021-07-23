import faker from "faker";
import { connection } from "../../src/database";

function randomBody() {
    return { name: faker.random.word(), youtubeLink: faker.internet.url() }
}
async function clearDatabase() {
    await connection.query(`TRUNCATE songs RESTART IDENTITY;`)
}
async function createTestSong() {
    await connection.query(`
    INSERT INTO songs
    ("name","url")
    VALUES
    ($1,$2)`, [faker.random.word, faker.internet.url])
}

export { randomBody, clearDatabase, createTestSong }