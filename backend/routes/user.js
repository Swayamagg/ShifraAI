import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { getCurrentUser, saveAssistant } from '../controllers/user.js'

const userRoute=express.Router()


userRoute.get("/current-user",isAuth,getCurrentUser)
userRoute.post("/save-assistant",isAuth,saveAssistant)

export default userRoute