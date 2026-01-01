import { connect } from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});
