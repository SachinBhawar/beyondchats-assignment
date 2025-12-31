import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import scrapAndGetArticles from "./services/scrapOldestFiveBlogs.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello from BeyondChats Backend!");
});

app.get("/api/articles", async (req, res) => {
    const result = await scrapAndGetArticles();
    res.json(result);
});

export default app;
