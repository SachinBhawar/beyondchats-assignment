import scrapAndGetArticles from "../services/scrapOldestFiveBlogs.js";
import Article from "../models/article.js";

export const getAllArticles = async (req, res) => {
    try {
        const existingArticles = await Article.find();

        if (existingArticles.length > 0) {
            return res.status(200).json(existingArticles);
        }

        const scrapedArticles = await scrapAndGetArticles();

        if (!scrapedArticles || scrapedArticles.length === 0) {
            return res.status(404).json({ message: "No articles found" });
        }

        await Article.insertMany(scrapedArticles);

        return res.status(200).json(scrapedArticles);
    } catch (err) {
        console.error("Error fetching articles:", err.message);
        return res.status(500).json({ error: "Failed to fetch articles" });
    }
};

export const createArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ error: "Title, content, and author are required" });
        }

        const newArticle = await Article.create({ title, content, author });

        return res.status(201).json(newArticle);
    } catch (err) {
        console.error("Error creating article:", err.message);
        return res.status(500).json({ error: "Failed to create article" });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) {
            return res.status(404).json({ error: "Article not found" });
        }

        return res.status(200).json({
            message: "Article deleted successfully",
        });
    } catch (err) {
        console.error("Error deleting article:", err.message);
        return res.status(500).json({ error: "Failed to delete article" });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        if (!title && !content && !author) {
            return res.status(400).json({ error: "At least one field must be updated" });
        }

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ error: "Article not found" });
        }

        return res.status(200).json(updatedArticle);
    } catch (err) {
        console.error("Error updating article:", err.message);
        return res.status(500).json({ error: "Failed to update article" });
    }
};
