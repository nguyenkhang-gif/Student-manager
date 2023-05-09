import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import {conditions} from '../condition.js'
// import { updateStudentScore } from '../../../api/controllers/student'


const SubjectScore= () => {
    const [allStudent,setallStudent] = useState([])
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
    const [selectedClasses,setSelectedClases]= useState('toan')
    const [allSubject,setAllSubject]= useState([])
    const [selectedSubject,setSelectedSUbject]= useState(1)
    const [selectSemesster,setSelectSemesster] = useState('')
  
    const navigate = useNavigate()
  
    const handleUpdateStudent = async ()=>{
      try{
        await axios.post("http://localhost:8800/api/student/updatestudentscore",{allStudent,subject:selectedSubject,semester:selectSemesster})
      }catch(err){
        console.log(err)
      }
    }
    const hanndleChange = (e)=>{
      setStudent((prev)=>({...prev,[e.target.name]:e.target.value}))
      console.log(student)
    }
    const handelChangeScore=(e,ID)=>{
      console.log(allStudent[1][e.target.name])
      allStudent.forEach((student,index)=>{
        if(student.ID==ID){
          let tempArray = [...allStudent]
          console.log(tempArray)
          tempArray[index][e.target.name]=e.target.value 
          setallStudent(tempArray)
        }
      })
    }

    const fetchAllStudentWithID = async ()=>{
        try{
          if(curentUser){
            const res = await axios.post(`http://localhost:8800/api/student/getsalltudentscorebyclassesid/${selectedClasses}`,{classes:selectedClasses,subject:selectedSubject,HK:selectSemesster})
            setallStudent(res.data)
          }
           
        }catch(err){
            console.log(err)
        }
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
    const fetchAllClasses = async ()=>{
        try{
          if(curentUser){
            const res = await axios.post("http://localhost:8800/api/student/allclasses")
            setAllClasses(res.data)
            // console.log(res.data )
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
      fetchStudentScore()
      fetchCondition()
    //   fetchAllStudent()
      fetchAllClasses()
    },[])
  
    const handleClick = (id)=>{
      navigate('/student/'+id)
    }
  
    const now = new Date()
    
    
  
  
    useEffect(()=>{
      fetchAllStudentWithID()
    },[selectedClasses,selectedSubject,selectSemesster])
  
    return (
      <div>
      {!curentUser ? null:curentUser.route=="teacher"?
        <div className='addstudent'>
            <div className="container-classes">
              <label >Tên lớp</label>
              <select name="classes" id="classes" onChange={(e)=>{setSelectedClases(e.target.value);console.log(allStudent)}}>
              <option key='999' value='999' >Không</option>
                {allClasses.map((item)=>{
                  return(
                    <option key={item.LopID} value={item.LopID} >{item.Name}</option>
                  )
                })}
              </select>
              <label >Tên môn</label>   
              <select name="subjects" id="subject" onChange={(e)=>{setSelectedSUbject(e.target.value);console.log(allStudent)}}>
                <option key='999' value='999' >Không</option>
                {allSubject.map((item,index)=>{
                  return(
                    item.TenHK=='HK1'?<option key={index} value={item.Name} >{item.Name}</option>:null
                  )
                })}
              </select>
              <label>Học kỳ</label>
              <select name="semester" id="semester" onChange={(e)=>{setSelectSemesster(e.target.value)}}>
              <option key='999' value='999' >Không</option>
                <option key ={1} value={'HK1'}>HK1</option>
                <option key = {2} value={'HK2'}>HK2</option>
              </select>
              <h1>Sĩ số: {allStudent.length}</h1>
              </div>
            
            <div className="container-allstudent">
                <table className="styled-table">
                
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>điểm 15p</th>
                            <th>điểm giữa kỳ</th>
                            <th>điểm cuối kỳ</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {allStudent.length? allStudent.map((student,index)=>(
                        <tr >
                          <td>{index+1}</td>
                          <td> {student.tenHocSinh}</td>
                          <td><input className='input-subject-score'  onChange={(e)=>{handelChangeScore(e,student.ID)}} value={student?.diem15phut} name="diem15phut" type="number"  /></td>
                          <td><input className='input-subject-score' onChange={(e)=>{handelChangeScore(e,student.ID)}} value={student?.diemGiuKy} name="diemGiuKy" type="number"  /></td>
                          <td><input className='input-subject-score' onChange={(e)=>{handelChangeScore(e,student.ID)}} value={student?.diemCuoiKy} name="diemCuoiKy" type="number"  /></td>
                        </tr>
                        
                    )):null} 
                      {/* <h1>{}</h1> */}
                    </tbody>
                </table>
          </div>
          <button onClick={()=>{console.log(allStudent);handleUpdateStudent()}}>Cập nhật </button>
        </div>:<div><h1>404 not found</h1></div>
      } 
    </div>
    )
}

export default SubjectScore

