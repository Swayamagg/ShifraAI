import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';
import assistantRoute from './routes/assistant.js';
import billingRoute from './routes/billing.js';
dotenv.config()

const app=express()
app.use(express.json())
app.use(cookieParser())

const privateCors=
cors({
    origin:["http://localhost:5173"],
    credentials:true
});

const publicCors=
cors({
    origin:"*",
});


app.get("/",(req,res)=>{
    res.send("hello from server")
})
app.use("/api/auth",privateCors,authRoute)
app.use("/api/user",privateCors,userRoute)
app.use("/api/assistant",publicCors,assistantRoute)
app.use("/api/billing",privateCors,billingRoute)
const port=process.env.PORT;
app.listen(port,()=>{
    console.log("server started")
    connectDB()
})