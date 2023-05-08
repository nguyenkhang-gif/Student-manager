import React, { useContext, useEffect, useState } from 'react'
import axios, { all } from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Student = () => {
  const [allStudent, setallStudent] = useState()
  const { curentUser } = useContext(AuthContext)
  const [student, setStudent] = useState({
    id: window.location.pathname.split('/')[2],
    Name: '',
    GioiTinh: '',
    NgaySinh: '',
    Address: '',
    email: ''
  })
  const [Name, setName] = useState('')
  const [GioiTinh, setGioiTinh] = useState('')
  const [NgaySinh, setNgaySinh] = useState('')
  const [Address, setAddress] = useState('')
  const fetchStudent = async () => {
    try {
      if (curentUser) {
        const pathname = window.location.pathname
        const ID = pathname.split('/')[2]
        const res = await axios.post(`http://localhost:8800/api/student/getstudent/${ID}`)
        setallStudent(res.data)
        setName(res.data[0].Name)
        setNgaySinh(res.data[0].NgaySinh)
        setGioiTinh(res.data[0].GioiTinh)
        setAddress(res.data[0].Address)
        // setNgaySinh(res.data[0].)
        setStudent({ id: window.location.pathname.split('/')[2], ...res.data[0] })
        const tempDate = Date(allStudent[0].NgaySinh)
        console.log(tempDate)
      }
      // console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const navigate = useNavigate()

  const hanndleChange = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(student)
  }

  const checkStudent = () => {
    return true;
  }

  useEffect(() => {
    fetchStudent()
  }, [])
  const handleClick = (id) => {
    navigate('/student/' + id)
  }
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:8800/api/student/edit/", student)

      // console.log(Date(student.NgaySinh))
      // setallStudent(res.data)
      // console.log(curentUser.ID)
      // console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    if(window.confirm('nhấn ok để xác nhận xóa')){
      try {
        await axios.post("http://localhost:8800/api/student/deletestudentwithID/", student)
  
        // console.log(Date(student.NgaySinh))
        // setallStudent(res.data)
        // console.log(curentUser.ID)
        // console.log(res.data)
      } catch (err) {
        console.log(err)
      }
      
    }
    
  }

  return (
    <div>
      {(!curentUser && !checkStudent()) ? null :
        <div className='addstudent'>
          <div className="container-input-addstudent">
            <div className="container-input-addstudent-child">
              <div className="item-student-info">
                <label htmlFor="">Tên</label>
                <input className='input-addStudent' onChange={hanndleChange} name="Name" type="text" placeholder='Tên' value={student.Name} />
              </div>
              <div className="item-student-info">
                <label htmlFor="">giới tính</label>
                <input className='input-addStudent' onChange={hanndleChange} name="GioiTinh" type="text" placeholder='giới tính' value={student.GioiTinh} />
              </div>
              <div className="item-student-info">
                <label htmlFor=""> Ngày sinh</label>
                <input className='input-addStudent' onChange={hanndleChange} name="NgaySinh" type="date" placeholder='ngày sinh' value={student.NgaySinh} />
              </div>
              <div className="item-student-info">
                <label htmlFor="">Địa chỉ</label>
                <input className='input-addStudent' onChange={hanndleChange} name="Address" type="text" placeholder='địa chỉ' value={student.Address} />
              </div>
              <div className="item-student-info">
                <label htmlFor="">email</label>
                <input className='input-addStudent' onChange={hanndleChange} name="email" type="email" placeholder='email' value={student.email} />
              </div>
              <div className="item-student-info">
                <button className='btn' onClick={handleAdd}><Link className='btn' to={'/'}>cập nhật</Link></button>
                <button className='btn' onClick={
                    handleDelete  }><Link className='btn' to={'/'}>Xóa học sinh</Link></button>
              </div>
            </div>
          </div>
          <div className='container-student-info'>
            {/* <h1>Thông số cũ</h1>
              <div className="student-info">
                <div className="student-info-item"><h2>Tên: {Name? Name :"không có tên"}</h2></div>
                <div className="student-info-item"><h2>Giới tính: {GioiTinh? GioiTinh:"không có"}</h2></div>
                <div className="student-info-item"><h2>Address: {Address?Address:"không có"}</h2></div>
                <div className="student-info-item"><h2>Address: {email?Address:"không có"}</h2></div>

              </div> */}
          </div>
        </div>
      }
    </div>
  )
}

export default Student
