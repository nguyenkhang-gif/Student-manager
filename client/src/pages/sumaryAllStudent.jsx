// import React, { useState } from 'react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import jsPDF from 'jspdf';

// import './App.css';


const SummaryAllStudent = () => {
  const [allStudent,setallStudent] = useState([])
  const {curentUser} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{
      fetchAllStudent()
      fetchStudentScore()
      fetchAllClasses()
      fetchAllRules()
    },[])
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
    const handleClick = (id)=>{
        if(curentUser.route=="teacher")navigate('/editscore/'+id)
        if(curentUser.route=="admin")navigate('/student/'+id)
    }

  const [allSubject,setAllSubject]= useState([])
  const [selectedSubject,setSelectedSUbject]= useState('none')
  const [selectSemesster,setSelectSemesster] = useState('none')
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

    const [allClasses,setAllClasses]= useState([])
    const [selectedClasses,setSelectedClases]= useState('toan')
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
    
    const [allClassesSumInfo,setAllClassesSumInfo] = useState([])

    // data sẽ dc trả về khi chọn môn và học kỳ 
    const handleSumary = async()=>{
        // console.log(selectSemesster,selectedSubject,allClasses)
        try{
            const res = await axios.post('http://localhost:8800/api/student/sumaryallstudentsemsub',{allClasses,selectSemesster,selectedSubject,passCon:allRules[0].passScore})
            console.log(res)
            setAllClassesSumInfo(res.data)
        }catch(err){

        }
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
        handleSumary()
    },[selectedSubject,selectSemesster])

    // làm file PDF
    const reportTemplateRef = useRef(null);
    const [isPDF,setIsPDF] = useState('')
    const handleGeneratePdf = () => {
      setIsPDF('onPDF')
      const doc = new jsPDF({
        format: 'a3',
        unit: 'px',
        // format: [4, 2]
      });
  
      // Adding the fonts.
      doc.setFont('Inter-Regular', 'normal');
  
      doc.html(reportTemplateRef.current, {
        async callback(doc) {
          await doc.save('document');
          setIsPDF('')
        },
      });
      
    };
    

  return (
    <div>
    {!curentUser ? null: 
      <div>
        <label >Tên môn</label>   
              <select name="subjects" id="subject" onChange={(e)=>{setSelectedSUbject(e.target.value);console.log(allStudent)}}>
                <option key='999' value='none' >Không</option>
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
     
        <div className="container-allstudent" >
          <div className={`container-sumary-${isPDF}`} ref={reportTemplateRef}>
            <div className={`h1-containers-${isPDF}`}>

            <h1 className={`h1-container-${isPDF}`}>HK:{selectSemesster?selectSemesster:null}</h1>
            {selectedSubject!='none'?  <h1 className={`h1-container-${isPDF}`}>môn:{selectedSubject?selectedSubject:null}</h1>:null}
            
            </div>
            <h1 className='header-container'>Báo cáo</h1>
              <table className={`styled-table ${isPDF}`} >
                  <thead>
                      <tr>
                          <th>TenLop</th>
                          <th>SiSo</th>
                          {/* <th>NgaySinh</th> */}
                          <th>TyLeDau</th>
                          <th>PhanTram</th>
                        
                      </tr>
                  </thead>
                  <tbody>
                  {allClassesSumInfo.map(classItem=>(
                      <tr  key={3}>
                        <td>{classItem.TenLop}</td>
                        <td>{classItem.SiSo}</td>
                        <td>{classItem.PassStudents}</td>
                        <td>{Math.round(classItem.passRate * 10) / 10  }%</td>
                      
                      </tr>
                  ))} 
                    
                  </tbody>
              </table>
              </div>
        </div>
        <button onClick={()=>{handleGeneratePdf()}}>Tạo file PDF </button>
      </div>
    }
    </div>
  )
}

export default SummaryAllStudent
