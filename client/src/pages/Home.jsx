// import React, { useState } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
// import './App.css';


const Home = () => {
  const [allStudent,setallStudent] = useState([])
  const {curentUser} = useContext(AuthContext)
  const navigate = useNavigate()


  
  useEffect(()=>{
    const fetchAllStudent = async ()=>{
        try{
          if(curentUser){
            if(curentUser.route=="admin"){
              const res = await axios.get("http://localhost:8800/api/student/")
              setallStudent(res.data)
            }else{

              const res = await axios.get("http://localhost:8800/api/student/"+curentUser.ID)
              setallStudent(res.data)
            }
            // console.log(curentUser.ID)
          }
            // console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllStudent()
  },[])
  const handleClick = (id)=>{
    if(curentUser.route=="teacher")navigate('/editscore/'+id)
    if(curentUser.route=="admin")navigate('/student/'+id)
  }

  return (
    <div>
    {!curentUser ? <div><h1>bạn chưa đăng nhập</h1></div>: 
      <div>
        {/* <h1>this is the home page</h1> */}
        <div className="container-allstudent">
              <table className="styled-table">
                  <thead>
                      <tr>
                          <th>MaLop</th>
                          <th>HoTen</th>
                          {/* <th>NgaySinh</th> */}
                          <th>GTinh</th>
                          <th>DiaChi</th>
                          <th>Email</th>
                          <th>Ngày Sinh</th>
                      </tr>
                  </thead>
                  <tbody>
                  {allStudent.map(student=>(
                      <tr onClick={()=>handleClick(student.ID)} key={student.ID}>
                        <td>{student.LopID}</td>
                        <td>{student.Name}</td>
                        <td>{student.GioiTinh}</td>
                        <td>{student.Address}</td>
                        <td>{student.email}</td>
                        <td>{student.NgaySinh}</td>
                      </tr>
                  ))} 
                    
                  </tbody>
              </table>
        </div>
      </div>
    }
    </div>
  )
}

export default Home
