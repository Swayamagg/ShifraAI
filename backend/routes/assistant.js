import express from 'express'
import { assistantConfig } from '../controllers/assistant.js'

const assistantRoute=express.Router()


assistantRoute.get("/config/:userId",assistantConfig)

export default assistantRoute