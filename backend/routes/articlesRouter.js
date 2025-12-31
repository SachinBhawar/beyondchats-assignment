import { Router } from "express";
import scrapAndGetArticles from "../services/scrapOldestFiveBlogs.js";
import Article from "../models/article.js";

const articlesRouter = Router();

articlesRouter.get("/", async (req, res) => {
    try {
        const isDocsInDb = await Article.find();
        if (isDocsInDb.length > 0) {
            return res.status(200).json(isDocsInDb);
        }
        const result = await scrapAndGetArticles();
        await Article.insertMany(result);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching articles:", err.message);
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});

articlesRouter.post("/", async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newArticle = new Article({ title, content, author });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        console.error("Error creating article:", err.message);
        res.status(500).json({ error: "Failed to create article" });
    }
});

articlesRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Article.findByIdAndDelete(id);
        res.status(200).json({ message: "Article deleted successfully" });
    } catch (err) {
        console.error("Error deleting article:", err.message);
        res.status(500).json({ error: "Failed to delete article" });
    }
});

articlesRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;
        const updatedArticle = await Article.findByIdAndUpdate(id, { title, content, author }, { new: true });
        res.status(200).json(updatedArticle);
    } catch (err) {
        console.error("Error updating article:", err.message);
        res.status(500).json({ error: "Failed to update article" });
    }
});

export default articlesRouter;
