import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from "./routes/userRoutes.js"
import doctorRouter from "./routes/doctorRoutes.js"

dotenv.config()
// app config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api endpts

app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)


app.listen(port, ()=>
    console.log("server running")
)