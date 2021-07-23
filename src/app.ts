import express from "express";
import cors from "cors";
import { newRec, vote, randomSong, topSongs } from "./controllers/controllers";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", newRec);
app.post("/recommendations/:id/upvote", vote)
app.post("/recommendations/:id/downvote", vote)
app.get("/recommendations/random", randomSong)
app.get("/recommendations/top/:amount", topSongs)
export default app;
