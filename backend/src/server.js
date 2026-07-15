////0sKvJZpgci2JmWAB
//mongodb+srv://sukhsirjansingh54_db_user:0sKvJZpgci2JmWAB@cluster0.mtesuwy.mongodb.net/?appName=Cluster0

import express, { Router } from "express";
import notesRoutes from "./routes/nodeRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./config/upstash.js";
import ratelimiter from "./middleware/ratelimiter.js";
import cors from "cors";

dotenv.config();





const app = express();

//middlewares
app.use(cors(
  {origin:"http://localhost:5173"}
))
app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", notesRoutes);



connectDB().then(() => { 
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
});