import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Register = () => {
    const [user,setUser] = useState({
        username:"",
        password:""
    })
    
    const {curentUser,login,setRefresh,refresh} = useContext(AuthContext)
    console.log(curentUser)
    const [err,setErr] = useState(null)

    const navigate = useNavigate()
    const handleChange = (e)=>{
        setUser((prev) => ({...prev,[e.target.name]:e.target.value}))
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            login(user)
            // await axios.post("http://localhost:8800/api/auth/login", user)
            await axios({
                method: 'post',
                url: 'http://localhost:8800/api/auth/login', // my Node server on 3000 port   
                data: user,
                withCredentials: true
             })
            navigate('/')
            
            
        }catch(err){
            console.log(err)
            
        }
        console.log(user)
    }

  return (
    <div>
      <div className="containerLogin">
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action="">
                        <h2>Đăng nhập</h2>
                        <div className="inputBox">
                            {/* <i className="fa-solid fa-envelope"></i> */}
                            <input type="text" name = "username" onChange={handleChange} required />
                            <label className='usernameinput' htmlFor="username" name = "username">Tên đăng nhập</label>
                        </div>
                        <div className="inputBox">
                            {/* <i className="fa-solid fa-lock"></i> */}
                            <input type="password" name ="password" onChange={handleChange} required />
                            <label htmlFor="password" name ="password">Mật khẩu</label>
                        </div>
                        {err && <p>{err}</p>}
                        
                        <button onClick={handleSubmit}>Đăng nhập</button>
                        
                    </form>
                </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default Register
