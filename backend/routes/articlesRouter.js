import { Router } from "express";

import {
    createArticle,
    deleteArticle,
    getAllArticles,
    updateArticle,
} from "../controllers/articlesController.js";

const articlesRouter = Router();

articlesRouter.get("/", getAllArticles);

articlesRouter.post("/", createArticle);

articlesRouter.delete("/:id", deleteArticle);

articlesRouter.put("/:id", updateArticle);

export default articlesRouter;
