import express from "express"
import {Login, logout, register}  from "../controllers/auth.js"


const router = express.Router()


router.post('/login',Login)
router.post('/logout',logout)
router.post('/register',register)


export default router