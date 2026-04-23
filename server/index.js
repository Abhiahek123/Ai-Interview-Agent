import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();

// ✅ FINAL CORS FIX (NO trailing slash + supports local & production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-interview-agent-eta.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("AI Interview API Running 🚀");
});

// Test route
app.get("/test", (req, res) => {
  res.send("Backend working ✅");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 6000;

// DB connect and start server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});