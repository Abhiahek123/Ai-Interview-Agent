// import express from "express"
// import dotenv from "dotenv"
// import connectDb from "./config/connectDb.js"
// import cookieParser from "cookie-parser"
// dotenv.config()
// import cors from "cors"
// import authRouter from "./routes/auth.route.js"
// import userRouter from "./routes/user.route.js"
// import interviewRouter from "./routes/interview.route.js"
// import paymentRouter from "./routes/payment.route.js"

// const app = express()
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

// app.use(express.json())
// app.use(cookieParser())

// app.use("/api/auth" , authRouter)
// app.use("/api/user", userRouter)
// app.use("/api/interview" , interviewRouter)
// app.use("/api/payment" , paymentRouter)

// const PORT = process.env.PORT || 6000
// app.listen(PORT , ()=>{
//     console.log(`Server running on port ${PORT}`)
//     connectDb()
// })










import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

dotenv.config()

const app = express()

// ✅ FIX 1: CORS update
app.use(cors({
    origin: "https://ai-interview-agent-eta.vercel.app/",   // temporary (production me change karna)
    credentials: true
})) 

app.use(express.json())
app.use(cookieParser())

// ✅ FIX 2: Root route add (browser error solve)
app.get("/", (req, res) => {
    res.send("AI Interview API Running 🚀")
})

// ✅ FIX 3: Test route (debugging ke liye)
app.get("/test", (req, res) => {
    res.send("Backend working ✅")
})

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

const PORT = process.env.PORT || 6000

// ✅ FIX 4: DB connect before listen (better practice)
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})