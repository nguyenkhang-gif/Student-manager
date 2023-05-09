import {db} from "../db.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"



export const Login = (req,res)=>{
    const q = "SELECT * FROM giaovien WHERE username = ?"

    db.query(q,[req.body.username],(err, data)=>{
        if(err) return res.json(err)
        if(data.length === 0)return res.status(404).json("Không tìm thấy người dùng")


        const isPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if(!isPassword)return res.status(400).json("Sai username hoặc mật khẩu")

        const token = jwt.sign({id:data[0].id},'jwtkey')
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(data[0])

    })
}

export const register = (req,res)=>{
    const q = "select * from giaovien where email = ? or username = ?"


    db.query(q, [req.body.email,req.body.username], (err,data)=>{
        if(err) return res.json(err)

        if(data.length) return res.status(409).json("Người dùng đã tồn tại")

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO giaovien(`email`, `username`,`password`,`route`) VALUES (?);"
        const values = [
            req.body.email,
            req.body.username,
            hash,
            'teacher'
        ]
        db.query(q,[values], (err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("Đăng ký thành công!!!")
        })
    })
}

export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out.")
}