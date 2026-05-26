import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';
dotenv.config()

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.get("/",(req,res)=>{
    res.send("hello from server")
})
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
const port=process.env.PORT;
app.listen(port,()=>{
    console.log("server started")
    connectDB()
})