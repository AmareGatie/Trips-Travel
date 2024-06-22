import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
dotenv.config();
const app = express();
const PORT =process.env.PORT || 3050;
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
// Middleware for CORS and JSON parsing

const allowedOrigins = [
    "https://trips-travel.vercel.app",
    "http://localhost:5173",
  ];
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );
  app.use(express.json()); // For parsing application/json
  app.use(cookieParser()); // For parsing cookies
  // If you need to parse other types of request bodies, you can still use body-parser
  app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  
// Routes
app.use("/api/auth", authRoutes);






  app.get("/", (req, res) => {
    res.send("Welcome to the Trips & Travels API!");
  });


  app.listen(PORT,()=>{
    console.log(`Server is Running on port${PORT}`)
  })
  