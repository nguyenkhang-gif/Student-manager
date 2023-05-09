import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import React, { useContext, useEffect, useState } from 'react'

const Navbar = () => {

  const {curentUser,login,logout} = useContext(AuthContext)
  const [isAdmin,setIsAdmin]= useState(curentUser?curentUser.route=="admin":false)
  const [isTeacher,setIsTeacher]= useState(curentUser?curentUser.route=="teacher":false)
  // console.log(curentUser.route==="admin")
  console.log(isAdmin)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    logout()
    window.location.reload()
  }

  
  useEffect(()=>{
    if(!curentUser&&window.location.href != "http://localhost:3000/login"&&window.location.href != "http://localhost:3000/register"){
      window.location.href = "http://localhost:3000/login";
    }
  },[curentUser])
  const pathname = window.location.pathname.split('/')[1]
  const ID = pathname

  useEffect(()=>{
    document.title="Quản lý học sinh"
  })
  useEffect(()=>{
    // console.log("path",pathname)
    if(curentUser){

      setIsAdmin(curentUser?curentUser.route=="admin":false)
      setIsTeacher(curentUser?curentUser.route=="teacher":false)
    }
    // window.location.reload()
  },[curentUser])
  return (
    <div className='Navbar-container'>
      <ul className='Navbar-ul-container'>
        {isAdmin?  <>
        <Link className={`btn Navbar-ul-Link ${!pathname?'selected':'null'}`}  to={'/'}>Trang chủ</Link>
        <Link className={`btn Navbar-ul-Link ${pathname=='addstudent'?'selected':'null'}`}  to={'/addstudent'}>Tiếp nhận học sinh</Link>
        {/* <Link className='btn Navbar-ul-Link'  to={'/findstudent'}>Find</Link> */}
        <Link className={`btn Navbar-ul-Link ${pathname=='classes'?'selected':'null'}`}   to={'/classes'}>Lập danh sách lớp</Link>
        <Link className={`btn Navbar-ul-Link ${pathname=='sumary'?'selected':'null'}`}   to={'/sumary'}>Lập báo cáo tổng kết </Link>
        <Link className={`btn Navbar-ul-Link ${pathname=='rules'?'selected':'null'}`}  to={'/rules'}>Thay đổi quy định</Link>
        </>:isTeacher?<>
        
        <Link className={`btn Navbar-ul-Link ${!pathname?'selected':'null'}`}  to={'/'}>Trang chủ</Link>
        {/* <Link className='btn Navbar-ul-Link'  to={'/addstudent'}>add student</Link> */}
        <Link className={`btn Navbar-ul-Link ${pathname=='subjectscores'?'selected':'null'}`}   to={'/subjectscores'}>Nhập điểm</Link>
        <Link className={`btn Navbar-ul-Link ${pathname=='findstudent'?'selected':'null'}`}  to={'/findstudent'}>Tra cứu học sinh</Link>
        {/* <Link className='btn Navbar-ul-Link'  to={'/classes'}>Classes</Link> */}
        </>:<h1>bạn chưa đăng nhập !</h1>
        }
      </ul>
      <div className="Navbar-input-container">
        <p className='user-name-p'>{curentUser?.Name} </p>
        <p className='user-name-p'>{curentUser? curentUser.route=='teacher'?'Giáo viên':curentUser.route=='admin'?'Quản lý':null:null} </p>
        {/* <input type="text" placeholder='nhập học sinh cần tìm' /> */}
       {curentUser ? <button onClick={handleLogout} >Đăng xuất</button> : <button><Link to='/login' >Đăng nhập</Link></button>}
       
        <button className='btn'><Link className='btn' to={'/register'}>Đăng Ký</Link></button>
      </div>
      

    </div>
  )
}

export default Navbar
