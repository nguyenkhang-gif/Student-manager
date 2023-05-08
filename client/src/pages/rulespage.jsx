import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Rulespage = () => {

    const { curentUser } = useContext(AuthContext)

    const [allRules, setAllRules] = useState()
    const [minAge, setMinAge] = useState()
    const fetchAllRules = async () => {
        try {
            const res = await axios.post('http://localhost:8800/api/student/getallrules')
            setAllRules(res.data[0])
            // console.log(res.data)
            setMinAge(res.data[0].minAge)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchAllRules()
        fetchAllClasses()
        fetchStudentScore()
    }, [])

    const hanndleChange = (e) => {
        setAllRules((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(allRules)
    }

    ////// LẤY TẤT CẢ LỚP
    const [allClasses, setAllClasses] = useState([])
    const [selectedClasses, setSelectedClases] = useState('toan')
    const fetchAllClasses = async () => {
        try {
            if (curentUser) {
                const res = await axios.post("http://localhost:8800/api/student/allclasses")
                setAllClasses(res.data)
                console.log(res.data)
            }
            // console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    ///// LẤY TẤT CẢ MÔN HỌC
    const [allSubject, setAllSubject] = useState([])
    const [selectedSubject, setSelectedSUbject] = useState('none')
    const [selectSemesster, setSelectSemesster] = useState('none')
    const fetchStudentScore = async () => {
        // lấy tất cả ác môn 
        try {
            const res = await axios.get("http://localhost:8800/api/student/studentscore/1")
            // console.log(res.data)
            setAllSubject(res.data)
            // console.log(ID)
        } catch (err) {
            console.log(err)
        }
    }


    //////handles



    const [addedSubject, setAddedSubject] = useState()

    const [addedClasses, setAddedclasses] = useState()

    const handdleclassesnamechange = (e, ID) => {
        allClasses.forEach((item, index) => {
            if (item.LopID == ID) {
                let tempArray = [...allClasses]
                tempArray[index][e.target.name] = e.target.value
                setAllClasses(tempArray)
            }
        })
    }


    const handdlesubjectnamechange = (e, Name) => {
        allSubject.forEach((item, index) => {
            if (item.Name == Name) {
                let tempArray = [...allSubject]
                tempArray[index][e.target.name] = e.target.value
                setAllSubject(tempArray)
            }
        })
    }

    

    /// async
    const handledeleteclasses = async (ID) => {
        try {
            const res = await axios.post(`http://localhost:8800/api/student/deleteclassesbyid/${ID}`)
            //cần sử lý "reload trang khi add xong"
            // window.location.reload()
            reloadPage()
            fetchAllClasses()
        } catch (err) {
            console.log(err)
        }
    }
    
    const handledeletesubject = async (ID) => {
        try {
            const res = await axios.post(`http://localhost:8800/api/student/deletesubjectbyid/${ID}`)
            reloadPage()
            //cần sử lý "reload trang khi add xong"
            // fetchAllClasses()
        } catch (err) {
            console.log(err)
        }
    }

    
    const handleupdateallclass = async () => {
        try {
            await axios.post(`http://localhost:8800/api/student/updateallclasses`, { allClasses })
        } catch (err) {
            console.log(err)
        }
    }

    const handleupdateallsubject = async () => {
        try {
            await axios.post(`http://localhost:8800/api/student/updateallsubject`, { allSubject })
            reloadPage()
        } catch (err) {
            
        }
    }
    
    const updateallrules = async ()=>{
        try{
            await axios.post(`http://localhost:8800/api/student/updateallrules`, { allRules })
            // await axios.post()
        }catch(err){

        }
    }



    const handleaddclasses = async (name) => {
        try {
            await axios.post(`http://localhost:8800/api/student/addclassesbyname/${name}`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleaddsubject = async () => {
        try {
            await axios.post(`http://localhost:8800/api/student/addsubjectbyname`, { addedSubject, allSubject })
            
        } catch (err) {
            console.log(err)
        }
    }

    const reloadPage=()=>{
        window.location.reload()
    }
    return (
        <div>
            {curentUser && curentUser.route == 'admin' ?
                <div className='rule-pages-container'>
                    <div className="container-rule">
                        <p>thay đổi tuổi tối thiểu tối đa</p>
                        <label htmlFor="minAge">tuổi tối thiểu</label>
                        <input onChange={(e) => {(allRules.maxAge>=e.target.value)? hanndleChange(e):alert('tuổi thấp nhất không phù hợp') }} type="number" name='minAge' value={allRules ? allRules.minAge : null} />
                        <label htmlFor="maxAge">tuổi tối đa</label>
                        <input onChange={(e) => {(allRules.minAge<=e.target.value)? hanndleChange(e):alert('tuổi caos nhất không phù hợp') }} type="number" name='maxAge' value={allRules ? allRules.maxAge : null} />
                    </div>
                    <div className="container-rule">
                        <p>thay đổi sĩ số tối đa của các lớp </p>
                        <label htmlFor="minAge">số lượng tối đa của một lớp</label>
                        <input onChange={(e) => { e.target.value>0? hanndleChange(e) :alert('số lượng không phù hợp') }} type="number" name='maxStudentNum' value={allRules ? allRules.maxStudentNum : null} />
                    </div>
                    <div className="container-rule">
                        <p>thay đổi điểm chuẩn đạt môn </p>
                        <label htmlFor="minAge">số lượng tối đa của một lớp</label>
                        <input onChange={(e) => { e.target.value>=0? hanndleChange(e):alert(' điểm không được âm') }} type="number" name='passScore' value={allRules ? allRules.passScore : null} />
                    </div>
                    <div className="container-rule">
                        <button className='btn-update-three-rule' onClick={()=>{console.log(allRules);updateallrules();alert('handle cập nhật tuổi điểm tối đa tối thiểu sĩ số tối đa')}}>cập nhật 3 nội dung trên</button>
                    </div>
                    {/* phần quy định của lớp */}


                    <div className="container-rule">
                        <p> thay đổi số lượng và tên các lớp học</p>
                        <div className="container-edit-class">
                            {allClasses.map((item, index) => {
                                return (
                                    <div className='container-all-class'>
                                        <input type="text" name='Name' onChange={(e) => handdleclassesnamechange(e, item.LopID)} value={item.Name} />
                                        <button className='button-delete-class' onClick={() => { alert('handle xóa lớp'); handledeleteclasses(item.LopID) }}>xóa lớp</button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="add-class-container">
                            <label htmlFor="edit-class">thêm lớp</label>
                            <input type="text" placeholder='tên lớp' onChange={(e) => { setAddedclasses(e.target.value) }} />
                            <button onClick={() => { alert(`xử lý thêm lớp ${addedClasses}`); handleaddclasses(addedClasses) ;reloadPage()}}>thêm lớp</button>
                            <button className='button-update-subject-and-class' onClick={() => { alert('xử lý cập nhật môn '); handleupdateallclass() }}>cập nhật lớp</button>
                        </div>
                    </div>
                    {/* phần quy định của môn học */}


                    <div className="container-rule">
                        <p>thay đổi số lượng tên các môn học </p>
                        <div className="container-edit-class">
                            {allSubject.map((item, index) => {
                                return (
                                    item.TenHK == 'HK1' ? <div className='container-all-class'>
                                        <input type="text" name='Name' value={item.Name} onChange={(e) => { handdlesubjectnamechange(e, item.Name) }} />
                                        <button className='button-delete-class' onClick={() => { alert('handle xóa môn'); console.log(allSubject);handledeletesubject(item.NameID) }}>xóa môn</button>
                                    </div> : null
                                )
                            })}
                            {/* <button className='button-update-subject-and-class' onClick={() => { alert('xử lý cập nhật môn '); }}>cập nhật môn</button> */}
                        </div>
                        <div className="add-class-container">
                            <label htmlFor="edit-class">thêm môn</label>
                            <input type="text" placeholder='tên môn' onChange={(e) => { setAddedSubject(e.target.value) }} />
                            <button onClick={() => { alert('xử lý thêm môn '); console.log(addedSubject); handleaddsubject();reloadPage() }}>thêm môn</button>
                            <button className='button-update-subject-and-class' onClick={() => { alert('xử lý cập nhật môn '); handleupdateallsubject() }}>cập nhật môn</button>
                        </div>
                    </div>
                   

                </div>
                : null}
        </div>
    )
}

export default Rulespage