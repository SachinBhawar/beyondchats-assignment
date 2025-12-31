import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import articlesRouter from "./routes/articlesRouter.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello from BeyondChats Backend!");
});

app.use("/api/articles", articlesRouter);

export default app;
