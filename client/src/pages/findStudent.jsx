// import React, { useState } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
// import './App.css';


const FindStudent = () => {
  const [allStudent,setallStudent] = useState([])
  const [allstudentEx,setAllstudentEx]= useState([])
  const [allstudentScore,setAllStudentScore]=useState([])
  const [allSubject,setAllSubject]= useState([])
  const {curentUser} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{
    fetchAllStudent()
    fetchAllStudentScore()
    
  },[])
  
  
  const fetchAllStudent = async ()=>{
      try{
        if(curentUser){
          const res = await axios.get("http://localhost:8800/api/student/1")
          setallStudent(res.data)
          setAllstudentEx(res.data)
          console.log(curentUser.ID)
        }
          // console.log(res.data)
      }catch(err){
          console.log(err)
      }
  }
  const fetchAllStudentScore= async()=>{
    try{
      if(curentUser){
        const res = await axios.get("http://localhost:8800/api/student/getstudentscore")
        setAllStudentScore(res.data)
        // console.log(curentUser.ID)
      }
    }catch(err){
      console.log(err)
    }
  }
  const handleClick = (id)=>{
    if(curentUser.route=="teacher")navigate('/editscore/'+id)
    if(curentUser.route=="admin")navigate('/student/'+id)
  }

  const fetchStudentScore = async ()=>{
    // lấy tất cả ác môn 
        try {
          const res = await axios.get("http://localhost:8800/api/student/studentscore/1")
          // console.log(res.data)
          setAllSubject(res.data)
          // console.log(ID)
        }catch(err){
          console.log(err)
        }
      }


  const [searchBarInput,setSearchBarInput]= useState()
  const handleSearchBarChange = ()=>{
    // console.log(e.target.value)
    const name = searchBarInput
    let newarray=[]
    // setAllstudentEx({allStudent})
    allstudentEx.forEach(item=>{
      const isFound=item.Name.includes(name)||item.Name.includes(name.toUpperCase())||item.Name.includes(name.toUpperCase())||item.TenLop.includes(name)
      if(isFound){
        newarray.push(item)
        console.log(item)
      }
    })
    setallStudent(newarray)
  }
  const tinhDiemTrungBinh = (val,HK)=>{
    let result=0;
    let countsub=0
    allstudentScore.forEach(item=>{
      if(val.ID==item.ID&&item.TenHK==HK){
        countsub++;
        const num = Number(item.diem15phut+item.diemGiuKy*2+item.diemCuoiKy*3)/6
        result+= Math.round(num * 10) / 10  
      }
      
    })
    // console.log(countsub)
    const temp = (result/(countsub))
    result = Math.round(temp * 10)/10
    return result
  }
  return (
    <div>
    {!curentUser ? null: 
      <div className='container-findStudent'>
        
        <div className="search-bar-container">
          <div className="result-counts">kết quả tìm kiếm:{allStudent.length}</div>
          <input type="text" onChange={(e)=>{setSearchBarInput(e.target.value)}} placeholder='nhập tên học sinh' onSubmit={()=>handleSearchBarChange()} />
          <button onClick={()=>handleSearchBarChange()}>tìm</button>
        </div>
        <div className="container-allstudent">
              <table className="styled-table">
                  <thead>
                      <tr>
                          <th>STT</th>
                          <th>Họ Tên</th>
                          <th>Tên Lớp</th>
                          {/* <th>NgaySinh</th> */}
                          <th>TB Học Kỳ 1</th>
                          <th>TB Học Kỳ 2</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                  {allStudent.map((student,index)=>(
                      <tr onClick={()=>handleClick(student.ID)} key={student.ID}>
                        <td>{index+1}</td>
                        <td>{student.Name}</td>
                        <td>{student.TenLop}</td>
                        <td>{tinhDiemTrungBinh(student,'HK1')}</td>
                        <td>{tinhDiemTrungBinh(student,'HK2')}</td>
                      
                        {/* <td>{student.email}</td>
                        <td>{student.NgaySinh}</td> */}
                      </tr>
                  ))} 
                    
                  </tbody>
              </table>
        </div>
        {/* <button onClick={()=>{console.log(allStudent);console.log(allStudent)}}>click shit</button> */}
      </div>
    }
    </div>
  )
}

export default FindStudent
