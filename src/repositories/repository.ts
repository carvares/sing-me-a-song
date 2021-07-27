import { connection } from "../database";
import { RecModel } from "../interfaces/interfaces";

async function insertRec(music: RecModel) {
    try {
        await connection.query(`
        INSERT INTO songs 
        ("name", "url") 
        VALUES($1,$2)`,
            [music.name, music.youtubeLink])
    } catch (e) {
        console.log(e)
    }
}
async function scorePlus(id: number) {
    try {

        const response = await connection.query(`
        UPDATE songs 
        SET "score" = "score" + 1
        WHERE "id" = $1
        RETURNING *
        `, [id])
        return response
    } catch (e) {
        console.log(e)
    }

}
async function scoreMinus(id: number) {
    try {
        const response = await connection.query(`
        UPDATE songs 
        SET "score" = "score" - 1
        WHERE "id" = $1
        RETURNING *
        `, [id])

        if (response.rows.length === 0) {
            return response
        } else {
            if (response.rows[0].score === -6) {
                await connection.query(`
                DELETE FROM songs
                WHERE id = $1
                `, [response.rows[0].id])
            }
            return response
        }


    } catch (e) {
        console.log(e)
    }

}
async function lowScoreSong() {
    try {
        const response = await connection.query(`
    SELECT *
    FROM songs
    WHERE score
    BETWEEN -5 
    AND 10
    `)
        return response.rows
    } catch (e) {
        console.log(e)
    };

}
async function highScoreSong() {
    try {
        const response = await connection.query(`
    SELECT *
    FROM songs
    WHERE score
    >= 10
    `)
        return response.rows
    } catch (e) {
        console.log(e)
    }
}
async function getTopSongs(amount: number) {
    try {
        const response = await connection.query(`
        SELECT *
        FROM songs
        ORDER BY score DESC
        LIMIT $1`, [amount])

        return response.rows
    } catch (e) {
        console.log(e)
    }

}

export { insertRec, scorePlus, scoreMinus, lowScoreSong, highScoreSong, getTopSongs }
