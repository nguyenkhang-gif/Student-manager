import express from "express"
import studentRouter from "./routes/student.js"
import authRouter from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","SET","POST"],
    credentials:true,
    withCredentials:true
}))

app.use(cookieParser())


app.use("/api/student", studentRouter)
app.use("/api/auth", authRouter)



app.listen(8800,()=>{
    console.log("sever connect!!")
})