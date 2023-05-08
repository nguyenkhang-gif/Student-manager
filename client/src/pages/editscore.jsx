// import React, { useState } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
// import './App.css';


const Editscore = () => {
  const [allStudent,setallStudent] = useState([])
  const [studentScore,setStudentScore]= useState()
  const {curentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const fetchStudentScore = async ()=>{
    
    try {
      const pathname = window.location.pathname
      const ID = pathname.split('/')[2]
      const res = await axios.get("http://localhost:8800/api/student/studentscore/"+ID)
      // console.log(res.data)
      setStudentScore(res.data)
      // console.log(ID)
    }catch(err){
      console.log(err)
    }
  }



  useEffect(()=>{
    const fetchAllStudent = async ()=>{
        try{
          if(curentUser){
            const res = await axios.get("http://localhost:8800/api/student/"+curentUser.ID)
            setallStudent(res.data)
            // console.log(curentUser.ID)
          }
            // console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchAllStudent()
    fetchStudentScore()
    // const pathname = window.location.pathname
    
  },[])



  const handleClick = (id)=>{
    if(curentUser.route=="teacher")navigate('/editscore/'+id)
    if(curentUser.route=="admin")navigate('/student/'+id)
  }

  return (
    <div>
    {!curentUser ? null: 
      <div>
        <h1>Tên : {studentScore? studentScore[0].TenHS:null}</h1>
        <div className="container-allstudent">
          <h1>HK1</h1>
              <table className="styled-table">
                  <thead>
                      <tr>
                          <th>Tên Môn</th>
                          <th>15 phút</th>
                          <th> giữa kỳ</th>
                          <th> cuối kỳ</th>
                          <th>điểm trung bình</th>
                      </tr>
                  </thead>
                  <tbody>
                  {studentScore? studentScore.map(item=>(
                     item.TenHK=='HK1'?<tr >
                        <td>{item.Name}</td>
                        <td>{item.diem15phut}</td>
                        <td>{item.diemGiuKy}</td>
                        <td>{item.diemCuoiKy}</td>
                        <td>{Math.round(item.diemTrungBinh * 10)/10 }</td>
                      </tr>:null
                     
                      )):null} 
                     
                  </tbody>
              </table>
              
          <h1>HK2</h1>
              <table className="styled-table">
                  <thead>
                      <tr>
                          <th>Tên Môn</th>
                          <th>15 phút</th>
                          <th> giữa kỳ</th>
                          <th> cuối kỳ</th>
                          <th>điểm trung bình</th>
                      </tr>
                  </thead>
                  <tbody>
                  {studentScore? studentScore.map(item=>(
                     item.TenHK=='HK2'?<tr >
                        <td>{item.Name}</td>
                        <td>{item.diem15phut}</td>
                        <td>{item.diemGiuKy}</td>
                        <td>{item.diemCuoiKy}</td>
                        <td>{Math.round(item.diemTrungBinh * 10)/10 }</td>
                      </tr>:null
                     
                      )):null} 
                     
                  </tbody>
              </table>
        </div>
      </div>
    }
    </div>
  )
}

export default Editscore
