import express from 'express'
import { googleAuth, logout } from '../controllers/auth.js'

const authRoute=express.Router()


authRoute.post("/google",googleAuth)
authRoute.get("/logout",logout)

export default authRoute