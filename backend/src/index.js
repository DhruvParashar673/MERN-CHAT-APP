import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ Connect to DB before anything else
connectDB();

// ✅ CORS middleware - full version

// ✅ Handle preflight requests explicitly
//app.options("*", cors());

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes); // ✅ fixed from previous typo

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
