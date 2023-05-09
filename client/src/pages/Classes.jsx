// import React from 'react'
// import React, { useState } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import {conditions} from '../condition.js'
import Student from './student'

// import './App.css';


const Classes = () => {
  const [allStudent,setallStudent] = useState([])
  const [allstudentEx,setAllstudentEx]= useState([])
  const [allStudentEx,setallStudentEx] = useState([])
  const [condition,setCondition]= useState([])
  const [notify,setNotify] = useState("")
  const {curentUser} = useContext(AuthContext)
  const [student,setStudent] = useState({
    Name:'',
    GioiTinh:'',
    NgaySinh:'',
    Address:'',
    email:''
  })


  const [allClasses,setAllClasses]= useState([])
  const [selectedClasses,setSelectedClases]= useState()


  const navigate = useNavigate()

  const hanndleChange = (e)=>{
    setStudent((prev)=>({...prev,[e.target.name]:e.target.value}))
    console.log(student)
  }

  const fetchAllStudent = async ()=>{
      try{
        if(curentUser){
          const res = await axios.get("http://localhost:8800/api/student/")
          setallStudent(res.data)
          setallStudentEx(res.data)
          setAllstudentEx(res.data)
          console.log(curentUser.ID)
        }
          // console.log(res.data)
      }catch(err){
          console.log(err)
      }
  }
  const fetchAllStudentWithID = async ()=>{
      try{
        if(curentUser){
          const res = await axios.post(`http://localhost:8800/api/student/getstudentclassid/${selectedClasses}`)
          setallStudent(res.data)
          console.log(res.data)
        }
          // console.log(res.data)
      }catch(err){
          console.log(err)
      }
  }
  const fetchAllClasses = async ()=>{
      try{
        if(curentUser){
          const res = await axios.post("http://localhost:8800/api/student/allclasses")
          setAllClasses(res.data)
          console.log(res.data )
        }
          // console.log(res.data)
      }catch(err){
          console.log(err)
      }
  }

  const fetchCondition = async ()=>{
    setCondition(conditions)
  }
  useEffect(()=>{
    fetchCondition()
    fetchAllStudent()
    fetchAllClasses()
    fetchAllRules()
  },[])

  const handleClick = (id)=>{
    navigate('/student/'+id)
  }

  const now = new Date()
  const checkIsInclasses = ()=>{
    
  }
  const handleAddStudent = async (e)=>{
    // console.log("ID: ", e.LopID,"lopID",selectedClasses)
    // console.log(allStudent.length)
    if(allStudent.length <= allRules[0].maxStudentNum){
      try{
        if(curentUser){
          const res = await axios.post('http://localhost:8800/api/student/addstudenttoclass',{ID:e.ID,lopID:selectedClasses})
          fetchAllStudentWithID()
        } 
      }catch(err){
        console.log(err)
      }
    }else{
      alert("lớp đã đủ")
    }
  }


  const getClassname=(studentID)=>{
    let temp 
    allClasses.forEach((item)=>{
      if(item.LopID===studentID){
       temp=item.Name
      }
      
      // console.log(item.LopID===studentID)
      
    })
    return temp

    // getClassname(student.LopID)
  }

  
  const [searchBarInput,setSearchBarInput]= useState()
  const handleSearchBarChange = ()=>{
    // console.log(e.target.value)
    const name = searchBarInput
    let newarray=[]
    // setAllstudentEx({allStudent})
    allstudentEx.forEach(item=>{
      if(item.Name.includes(name)||item.Name.includes(name.toUpperCase())||item.Name.includes(name.toLowerCase())){
        newarray.push(item)
        console.log(item)
      }
    })
    setallStudentEx(newarray)
  }


  const [allRules,setAllRules]= useState([])

  const fetchAllRules = async ()=>{
    try{
      const res = await axios.post('http://localhost:8800/api/student/getallrules')
      setAllRules(res.data)
    }
    catch(err){
      console.log(err)
    }
  }






  useEffect(()=>{
    fetchAllStudentWithID()
  },[selectedClasses])

  return (
    <div>
    {!curentUser ? <h1>bạn chưa đăng nhập</h1> :curentUser.route=="admin"?
      <div className='addstudent'>
          <div className="container-classes">
            <label >Tên lớp</label>
            <select name="classes" id="classes" onChange={(e)=>{setSelectedClases(e.target.value);}}>
              {allClasses.map((item)=>{
                return(
                  <option key={item.LopID} value={item.LopID} >{item.Name}</option>
                )
              })}
            </select>
            <h1>Sĩ số: {allStudent.length}</h1>
            </div>
          {/* <div className="container-input-addstudent">
              <input className='input-addStudent' onChange = {hanndleChange} name="Name" type="text" placeholder='Tên'  />
              <input className='input-addStudent' onChange = {hanndleChange} name="GioiTinh" type="text" placeholder='giới tính' />
              <input className='input-addStudent' onChange = {hanndleChange} name="NgaySinh" type="date" placeholder='ngày sinh' />
              <input className='input-addStudent' onChange = {hanndleChange} name="Address"type="text" placeholder='địa chỉ' />
              <input className='input-addStudent' onChange = {hanndleChange} name="email" type="email" placeholder='email' />
              <div className="notifycontainer">
                <h1>{notify}</h1>
              </div>
              <button className='btn'onClick={handleAdd}>add student</button>
          </div> */}
          <div className="container-allstudent">
              <table className="styled-table">
                  <thead>
                      <tr>
                          <th>STT</th>
                          <th>MaHS</th>
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
                  {allStudent.map((student,index)=>(
                      <tr  key={student.ID}>
                        <td>{index+1}</td>
                        <td>{student.ID}</td>
                        <td>{getClassname(student.LopID)}</td>
                        <td>{student.Name}</td>
                        <td>{student.GioiTinh}</td>
                        <td>{student.Address}</td>
                        <td>{student.email}</td>
                        <td>{student.NgaySinh} </td>
                      </tr>
                  ))} 
                  </tbody>
              </table>
              <div className="search-bar-container">
          <input type="text" onChange={(e)=>{setSearchBarInput(e.target.value)}} placeholder='nhập tên học sinh' />
          <button onClick={()=>handleSearchBarChange()}>tìm</button>
        </div>
              <table className="styled-table">
                  <thead>
                      <tr>
                          <th>STT</th>
                          <th>MaHS</th>
                          <th>HoTen</th>
                          {/* <th>NgaySinh</th> */}
                          <th>GTinh</th>
                          <th>DiaChi</th>
                          <th>Email</th>
                          <th>Ngày Sinh</th>
                      </tr>
                  </thead>
                  <tbody>
                  {allStudentEx.map((student,index)=>(
                      <tr  key={student.ID}>
                        <td>{index+1}</td>
                        <td>{student.ID}</td>
                        <td>{student.Name}</td>
                        {/* <td>{student.NgaySinh}</td> */}
                        <td>{student.GioiTinh}</td>
                        <td>{student.Address}</td>
                        <td>{student.email}</td>
                        <td>{student.NgaySinh} <button onClick={()=>{handleAddStudent(student)}}>thêm</button></td>
                      </tr>
                  ))} 
                  </tbody>
              </table>
        </div>
      </div>
    :<div><h1>404 not found</h1></div>}
  </div>
  )
}

export default Classes
