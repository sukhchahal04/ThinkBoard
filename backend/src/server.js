////0sKvJZpgci2JmWAB
//mongodb+srv://sukhsirjansingh54_db_user:0sKvJZpgci2JmWAB@cluster0.mtesuwy.mongodb.net/?appName=Cluster0

import express, { Router } from "express";
import notesRoutes from "./routes/nodeRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./config/upstash.js";
import ratelimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();





const app = express();
const __dirname=path.resolve()

//middlewares
if(process.env.NODE_ENV !=="production"){
app.use(cors(
  {origin:"http://localhost:5173"}
));
}


app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", notesRoutes);
if(process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
app,get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})

}


connectDB().then(() => { 
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
});