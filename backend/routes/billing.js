import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { createOrder, verifyBilling } from '../controllers/billing.js'

const billingRoute=express.Router()

billingRoute.post("/order",isAuth,createOrder)
billingRoute.post("/verify",isAuth,verifyBilling)

export default billingRoute