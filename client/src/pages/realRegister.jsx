import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const RealRegister = () => {
    const [newuser,setnewUser] = useState({
        username:"",
        password:"",
        email:""
    })

    const [err,setErr] = useState(null)

    const navigate = useNavigate()
    const handleChange = (e)=>{
        setnewUser((prev) => ({...prev,[e.target.name]:e.target.value}))
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/api/auth/register", newuser)
            navigate('/')
            
        }catch(err){
            setErr(err.response.data)
        }
        // console.log(newuser)
    }
    console.log(newuser)
  return (
    <div>
      <div className="containerLogin">
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action="">
                        <h2>Đăng ký</h2>
                        <div className="inputBox">
                            {/* <i className="fa-solid fa-envelope"></i> */}
                            <input type="text" name ="username" onChange={handleChange} required />
                            <label htmlFor="username" name = "username">Tên Đăng nhập</label>
                        </div>
                        <div className="inputBox">
                            {/* <i className="fa-solid fa-envelope"></i> */}
                            <input type="email" name = "email" onChange={handleChange} required />
                            <label htmlFor="email" name = "email">Email</label>
                        </div>
                        <div className="inputBox">
                            {/* <i className="fa-solid fa-lock"></i> */}
                            <input type="password"  name ="password" onChange={handleChange}  required />
                            <label htmlFor="password" name ="password">Mật khẩu</label>
                        </div>
                        {err? <p style={{fontSize:20,fontWeight:'700',color:'white'}}>{err}</p>:null}
                        
                        <button onClick={handleSubmit}>Đăng ký</button>
                        
                    </form>
                </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default RealRegister
