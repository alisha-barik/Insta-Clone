import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config({});
const app = express();

app.get("/", (req, res)=>{
    res.send("brothere look here")
})

//middlewaress
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended :true}));
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/message", messageRoutes)

const PORT = process.env.PORT
connectDB();

app.listen(PORT, ()=>{
    console.log(`server listen at port ${PORT}`)
})