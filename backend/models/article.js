import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
