import { Request, Response } from "express";
import { schema } from "../schema/musicSchema";
import { insertRec, scorePlus, scoreMinus, lowScoreSong, highScoreSong, getTopSongs } from "../repositories/repository"


async function newRec(req: Request, res: Response) {
    try {
        const music = req.body
        const validation = schema.validate(music)

        if (validation.error) return res.sendStatus(400)

        await insertRec(music)
        res.sendStatus(201);

    } catch (e) {
        console.log(e)
        return res.sendStatus(500)

    }
}
async function vote(req: Request, res: Response) {
    try {
        if (req.route.path === "/recommendations/:id/upvote") {
            const response = await scorePlus(parseInt(req.params.id))
            if (response.length === 0) res.sendStatus(404)
            else {
                res.sendStatus(200)
            }
        }
        if (req.route.path === "/recommendations/:id/downvote") {
            const response = await scoreMinus(parseInt(req.params.id))
            if (response.length === 0) res.sendStatus(404)
            else {
                res.sendStatus(200)
            }
        }

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
async function randomSong(req: Request, res: Response) {
    try {
        const random = await (Math.floor(Math.random() * 10)) + 1;
        if (random <= 3) {
            let response: object[] | undefined = await lowScoreSong()
            if (response[0] === undefined) {
                response = await highScoreSong();
                if (response[0] === undefined) res.sendStatus(404);
            }
            response = response.sort(() => Math.random() - 0.5)
            res.send(response[0]);
        }
        else {
            let response: object[] | undefined = await highScoreSong()
            if (response[0] === undefined) {
                response = await lowScoreSong();
                if (response[0] === undefined) res.sendStatus(404);
            }
            response = response.sort(() => Math.random() - 0.5)
            res.send(response[0]);
        }

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
async function topSongs(req: Request, res: Response) {
    try {
        const amount = parseInt(req.params.amount)
        const songs = await getTopSongs(amount)
        if (songs.length === 0) return res.sendStatus(404)
        res.send(songs)

    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}
export { newRec, vote, randomSong, topSongs };