import { db } from "../db.js"

export const allStudent = (req, res) => {
    const q = "SELECT * FROM HocSinh;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}
export const Student = (req, res) => {
    // const q = "select hocsinh.Address,lop.Name as TenLop ,hocsinh.Name,hocsinh.email,hocsinh.ID,hocsinh.GioiTinh from lop join hocsinh on lop.LopID = hocsinh.LopID  join giaovien on giaovien.ID=lop.teacherID;"
    const q = "select hocsinh.Address,lop.Name as TenLop ,hocsinh.Name,hocsinh.email,hocsinh.ID,hocsinh.GioiTinh from lop join hocsinh on lop.LopID = hocsinh.LopID ;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

export const addStudent = (req, res) => {
    let q = `INSERT INTO hocsinh (Name, Address, GioiTinh, email,NgaySinh) VALUES ('${req.body.Name}','${req.body.Address}','${req.body.GioiTinh}','${req.body.email}','${req.body.NgaySinh}');`
    let q1 = `select ID from hocsinh where Name='${req.body.Name}' and Address= '${req.body.Address}' and GioiTinh='${req.body.GioiTinh}' and email='${req.body.email}' and NgaySinh = '${req.body.NgaySinh}'`
    // console.log('addstudent: ')
    db.query(q, (err, data) => {
        // console.log(data)
        db.query(q1, (err, data) => {
            // console.log(data)
            req.body.subjects.forEach(subject => {
                // console.log("this is add")
                db.query(`INSERT INTO diem(ID,Name,TenHK) VALUES (${data[0].ID}, '${subject.Name}','${subject.TenHK}')`, (err, data) => {

                    if (err) console.log(err)
                })
                db.query(`UPDATE diem
                    SET diem15phut = 0, diemGiuKy =0,diemCuoiKy = 0
                    WHERE  ID=${data[0].ID} ;`, (err, data) => { if (err) console.log(err) }
                )
                // db.query(`INSERT INTO diem(ID,Name,TenHK) VALUES ((select count(ID) from hocsinh), '${subject.Name}','HK2');`,(err,data)=>{
                //     if(err)console.log(err)
                // })
            });
        })
        if (err) return res.json(err)
        else {

        }
    })

}


export const editStudent = (req, res) => {
    const q = `update hocsinh set Name = "${req.body.Name}", GioiTinh = "${req.body.GioiTinh}",Address = "${req.body.Address}", email="${req.body.email}",NgaySinh = "${req.body.NgaySinh}" where ID = ${req.body.id};`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}


export const getStudentById = (req, res) => {
    const q = "SElECT * from hocsinh where ID = ?"
    db.query(q, [req.params.ID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}
export const allClasses = (req, res) => {
    const q = "SElECT * from lop;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}


export const getStudentClassId = (req, res) => {
    const q = "SElECT * from hocsinh where LopID = ?;"
    db.query(q, [req.params.ID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}
export const getStudentScore = (req, res) => {
    const q = "SElECT diem.NameID,diem.ID,diem.Name,diem.diem15phut,diem.diemCuoiKy,diem.diemGiuKy,diem.TenHK ,(diem15phut+diemCuoiKy*3+diemGiuKy*2)/6 as diemTrungBinh,hocsinh.Name as TenHS from diem join hocsinh on hocsinh.ID=diem.ID  where diem.ID = ?;"
    db.query(q, [req.params.ID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}
export const updateStudentScore = (req, res) => {
    let q = "SElECT * from diem where ID = ?;"
    req.body.allStudent.forEach(student => {
        // console.log(`UPDATE diem
        // SET diem15phut = ${Number(student.diem15phut)}, diemGiuKy = ${Number(student.diemGiuKy)},diemCuoiKy = ${Number(student.diemCuoiKy)}
        // WHERE Name='${req.body.subject}'and ID=${student.ID};`)
        db.query(`UPDATE diem
        SET diem15phut = ${Number(student.diem15phut)}, diemGiuKy = ${Number(student.diemGiuKy)},diemCuoiKy = ${Number(student.diemCuoiKy)}
        WHERE Name='${req.body.subject}'and ID=${student.ID} and TenHK='${req.body.semester}';`, (err, data) => {
            if (err) console.log(err)
            // console.log('update success!')
        })
    })

}
export const getAllStudentScoreClassId = (req, res) => {
    const q = `select hocsinh.ID as ID,diem15phut,diemGiuKy,diemCuoiKy,hocsinh.Name as tenHocSinh from hocsinh join diem on diem.ID=hocsinh.ID join lop on lop.LopID=hocsinh.LopID where diem.Name = '${req.body.subject}' and lop.lopID=${req.body.classes} and diem.TenHK='${req.body.HK}';`
    db.query(q, [req.params.ID], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}
export const addStudentToClass = (req, res) => {
    const q = `UPDATE hocsinh
    SET LopID=${Number(req.body.lopID)}
    WHERE ID=${req.body.ID}`
    db.query(q, [req.params.ID], (err, data) => {
        // console.log('add student')
        if (err) return res.json(err)
        return res.json(data)
    })
}

export const getAllStudentscore = (req, res) => {
    const q = `select hocsinh.ID,diem.Name,diem.TenHK,diem15phut,diemGiuKy,diemCuoiKy from diem join hocsinh on hocsinh.ID=diem.ID;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

export const sumaryALlStudentSemSub = (req, res) => {

    let finalRes = []
    // console.log(req.body.selectedSubject=='none')
    if (req.body.selectedSubject != 'none' && req.body.selectSemesster != 'none') {
        db.query(`select hocsinh.Name as TenHS,lop.Name as TenLop,lop.LopID as LopID, (diem15phut+diemGiuKy*2+diemCuoiKy*3)/6 as diemTB  from hocsinh join lop on lop.LopID = hocsinh.LopID join diem on hocsinh.ID=diem.ID where diem.Name = '${req.body.selectedSubject}' and TenHK = '${req.body.selectSemesster}';`, (err, data) => {
            // console.log(req.body.allClasses)
            // console.log(`select hocsinh.Name as TenHS,lop.Name as TenLop,lop.LopID as LopID, (diem15phut+diemGiuKy*2+diemCuoiKy*3)/6 as diemTB  from hocsinh join lop on lop.LopID = hocsinh.LopID join diem on hocsinh.ID=diem.ID where diem.Name = '${req.body.selectedSubject}' and TenHK = '${req.body.selectSemesster}';`)
            req.body.allClasses.forEach(itemClass => {
                let studentCount = 0
                let passesCount = 0
                data.forEach(itemData => {
                    if (itemClass.LopID == itemData.LopID) {
                        studentCount++
                        // console.log('diem ',itemData.diemTB,'pass con',req.body.passCon)
                        if (itemData.diemTB > req.body.passCon) {
                            passesCount++;
                        }
                    }
                })
                finalRes.push({ TenLop: itemClass.Name, SiSo: studentCount, PassStudents: passesCount, passRate: (passesCount / studentCount) * 100 })
                // console.log({TenLop:itemClass.Name,SiSo:studentCount,PassStudents:passesCount,passRate:(`${passesCount}/${studentCount}`)})
            })
            res.json(finalRes)
        })
    } else if (req.body.selectedSubject == 'none' && req.body.selectSemesster != 'none') {
        db.query(`select hocsinh.Name as TenHS,hocsinh.ID as hsID,diem.Name as TenMon,lop.Name as TenLop,lop.LopID as LopID, (diem15phut+diemGiuKy*2+diemCuoiKy*3)/6 as diemTB from hocsinh join lop on lop.LopID = hocsinh.LopID join diem on hocsinh.ID=diem.ID where  TenHK = '${req.body.selectSemesster}';`, (err, mainData) => {
            // console.log(`select hocsinh.Name as TenHS,hocsinh.ID as hsID,diem.Name as TenMon,lop.Name as TenLop,lop.LopID as LopID, (diem15phut+diemGiuKy*2+diemCuoiKy*3)/6 as diemTB from hocsinh join lop on lop.LopID = hocsinh.LopID join diem on hocsinh.ID=diem.ID where  TenHK = '${req.body.selectedSubject}';`)
            if (err) console.log(err)
            // console.log(mainData)
            db.query(`select ID,LopID from hocsinh`, (err, idData) => {
                req.body.allClasses.forEach(itemClass => {
                    let studentCount = 0
                    let passesCount = 0
                    idData.forEach(idItem => {
                        // tính tổng các điểm của học sinh

                        let tongTB = 0
                        let subjectSize = 0//số lượng môn
                        mainData.forEach(mainItem => {

                            if (mainItem.hsID == idItem.ID) {

                                tongTB += mainItem.diemTB
                                subjectSize++
                            }
                        })
                        // với ID thì sử lý có cộng count hay ko 
                        if (itemClass.LopID == idItem.LopID) {
                            // console.log('work')
                            studentCount++
                            if ((tongTB / subjectSize) >= req.body.passCon) {
                                passesCount++
                            }
                        }
                    })
                    finalRes.push({ TenLop: itemClass.Name, SiSo: studentCount, PassStudents: passesCount, passRate: (passesCount / studentCount) * 100 })
                    // console.log(finalRes)
                })
                res.json(finalRes)
            })

        })

    }
}

export const getAllRules = (req, res) => {
    const q = `select * from rules;`
    db.query(q, (err, data) => {
        // console.log('get rules')
        if (err) res.json(err)
        res.json(data)
    })
}

export const deleteClassesWithID = (req, res) => {
    const q = `select ID from hocsinh where LopID = ${req.params.ID}`
    db.query(q, (err, data) => {

        db.query(`delete from lop where LopID=${req.params.ID}`)
        data.forEach(item => {
            db.query(`update hocsinh set LopID=0 where ID = ${item.ID}`, (err, data) => {
                if (err) console.log(err)
                // console.log('item ID:',item.ID)
            })
        })
    })
}

export const deleteSubjectWitdhID = (req, res) => {
    const q = `delete from diem where NameID = ${req.params.ID}`
    db.query(q, (err, data) => {
        if (err) console.log(err)
    })
}

export const addClassesbyName = (req, res) => {
    const q = `insert into lop(Name) value('${req.params.name}')`
    db.query(q, (err, data) => {
        if (err) console.log(err)
    })
}


export const addSubjectByName = (req, res) => {

    //làm 1 hàm ngẫu nhiên số 
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    // end ngẫu nhiên số
    const generateID = () => {
        let keepLoop = true
        let finalResult
        while (keepLoop) {
            const tempNum = getRandomInt(100)
            let isCopy = false;
            req.body.allSubject.forEach(itemSubject => {
                if (itemSubject.NameID == tempNum) {
                    isCopy = true
                    // console.log("is copy")
                }
            })
            if (!isCopy) { keepLoop = false; finalResult = tempNum }
        }
        return finalResult
    }

    const q = `select ID from hocsinh`
    const name = req.body.addedSubject
    const genID = generateID()
    // console.log(req.body.allSubject)
    // console.log(generateID())
    db.query(q, (err, allID) => {
        allID.forEach(itemID => {
            // console.log(`insert into diem(ID,Name,NameID) value (${itemID.ID},'${name}',${genID});`)
            db.query(`insert into diem(ID,Name,NameID,TenHK) value (${itemID.ID},'${name}',${genID},'HK1'),(${itemID.ID},'${name}',${genID},'HK2');`, (err, data) => {
                if (err) console.log(err)
            })
        })
    })
}

export const updateAllClasses = (req, res) => {
    const allclassesarray = req.body.allClasses
    // console.log(allclassesarray)
    allclassesarray.forEach(item => {
        db.query(`update lop set Name = '${item.Name}' where LopID=${item.LopID}`, (err, data) => {
            if (err) console.log(err)
        })
    })
}


export const updateAllSubject = (req, res) => {
    const allsubjectarray = req.body.allSubject;
    // console.log(allsubjectarray)
    allsubjectarray.forEach(item => {
        db.query(`update diem set Name = '${item.Name}' where NameID=${item.NameID};`, (err, data) => {
            if (err) console.log(err)
        })
    })
}


export const updateAllrules = (req, res) => {
    const allrules = req.body.allRules;
    console.log(allrules)
    const q = `update rules set minAge=${Number(allrules.minAge)},maxAge=${Number(allrules.maxAge)},maxStudentNum=${Number(allrules.maxStudentNum)},passScore=${Number(allrules.passScore)} where ID=1;`
    db.query(q, (err, data) => {
        if (err) console.log(err)
    })
}