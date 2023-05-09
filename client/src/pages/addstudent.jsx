import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import {conditions} from '../condition.js'

const Addstudent = () => {
  const [allStudent,setallStudent] = useState([])
  const [condition,setCondition]= useState([])
  const [notify,setNotify] = useState("")
  const {curentUser} = useContext(AuthContext)
  const [student,setStudent] = useState({
    Name:'',
    GioiTinh:'',
    NgaySinh:'',
    Address:'',
    email:'',
    subjects:[]
  })


  const [allSubject,setAllSubject]= useState([])
  const fetchStudentScore = async ()=>{
    
    try {
      const res = await axios.get("http://localhost:8800/api/student/studentscore/1")
      console.log(res.data)
      setAllSubject(res.data)
      // console.log(ID)
    }catch(err){
      console.log(err)
    }
  }
  const navigate = useNavigate()

  const hanndleChange = (e)=>{
    setStudent((prev)=>({...prev,[e.target.name]:e.target.value,subjects:allSubject}))

    // console.log(student)
  }

  const fetchAllStudent = async ()=>{
      try{
        if(curentUser){
          const res = await axios.get("http://localhost:8800/api/student/")
          setallStudent(res.data)
          console.log(curentUser.ID)
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
    fetchStudentScore()
    fetchAllRules()
    // setStudent((prev)=>({...prev,subjects:allSubject}))
  },[])

  const handleClick = (id)=>{
    navigate('/student/'+id)
  }
  // funtionss kkkkkkkk
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
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






  const now = new Date()
  const handleAdd =async()=>{
    const age =now.getFullYear() - student.NgaySinh.split('-')[0]
    // &&  allRules[0].maxAge
    const d = new Date();
          // console.log(d.getFullYear())
    const Age = Number(d.getFullYear()) - Number(student.NgaySinh[0]+student.NgaySinh[1]+student.NgaySinh[2]+student.NgaySinh[3]);
    const addCon = validateEmail(student.email)&&student.Name!=''&&(student.GioiTinh=='nam'||student.GioiTinh=='nu') && (Age>=allRules[0].minAge&&Age<=allRules[0].maxAge)
    // console.log(all)
    if(addCon){
        // console.log("student can be add")
        setNotify("Thêm thành công")
        setStudent((prev)=>({...prev,subjects:allSubject}))
        try{
            await axios.post("http://localhost:8800/api/student/add/",student)
            fetchAllStudent()
            // console.log(res.data)
            // setallStudent(res.data)
            // console.log(curentUser.ID)
            // console.log(res.data)
        }catch(err){
            console.log(err)
        }  
     
        // setNotify("không thêm được")
      }
    else{
      setNotify("Thông tin không hợp lệ")
    }
  }


  return (
    <div>
    {!curentUser ? <h1>bạn chưa đăng nhập</h1> :
      <div className='addstudent'>
        
          <div className="container-input-addstudent">
            <div className="container-input-addstudent-child">
              <div className="item-student-info">
                <label htmlFor="Name">Họ và Tên</label>
                <input className='input-addStudent' onChange = {hanndleChange} name="Name" type="text" placeholder='Tên'  />
              </div>
              <div className="item-student-info">
                <label htmlFor="Name">Giới Tính</label>
                <input className='input-addStudent' onChange = {hanndleChange} name="GioiTinh" type="text" placeholder='Giới tính' />
              </div>
              <div className="item-student-info">
                <label htmlFor="Name">Ngày Sinh</label>
                <input className='input-addStudent' onChange = {hanndleChange} name="NgaySinh" type="date" placeholder='Ngày sinh' />
              </div>
              <div className="item-student-info">
                <label htmlFor="Name">Địa chỉ</label>
                <input className='input-addStudent' onChange = {hanndleChange} name="Address"type="text" placeholder='Địa chỉ' />
              </div>
              <div className="item-student-info">
                <label htmlFor="Name">Email</label>
                <input className='input-addStudent' onChange = {hanndleChange} name="email" type="email" placeholder='Email' />
              </div>
              <div className="notifycontainer">
                <p style={{color:'red',fontWeight:'bold'}}>{notify}</p>
              </div>
              <div className="item-student-info">
              <button className='btn'onClick={handleAdd}>Thêm học sinh</button>
              </div>
            </div>
          </div>
          <div className="container-allstudent">
              <table className="styled-table">
                  <thead>
                      <tr>
                          <th>STT</th>
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
                      <tr onClick={()=>handleClick(student.ID)} key={student.ID}>
                        <td>{index+1}</td>
                        <td>{student.LopID}</td>
                        <td>{student.Name}</td>
                        {/* <td>{student.NgaySinh}</td> */}
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

export default Addstudent
