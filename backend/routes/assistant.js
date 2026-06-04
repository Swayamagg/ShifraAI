import express from 'express'
import { askAssistant, assistantConfig } from '../controllers/assistant.js'

const assistantRoute=express.Router()


assistantRoute.get("/config/:userId",assistantConfig)
assistantRoute.post("/ask",askAssistant)

export default assistantRoute