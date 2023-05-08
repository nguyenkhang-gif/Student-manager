import express from "express"

import { addStudent, allStudent,editStudent,getStudentById,Student,allClasses,getStudentClassId, getStudentScore, getAllStudentScoreClassId, updateStudentScore, addStudentToClass, getAllStudentscore, sumaryALlStudentSemSub, getAllRules, deleteClassesWithID, addClassesbyName, updateAllClasses, updateAllSubject, addSubjectByName, deleteSubjectWitdhID, updateAllrules} from "../controllers/student.js"

const router = express.Router()


router.get('/',allStudent)
router.get('/all',allStudent)
router.get('/getstudentscore',getAllStudentscore)

router.get('/:id',Student)
router.post('/add',addStudent)
router.post('/getstudent/:ID',getStudentById)
router.post('/edit',editStudent)
router.post('/allclasses',allClasses)
router.post('/getstudentclassid/:ID',getStudentClassId)
router.get('/studentscore/:ID',getStudentScore)
router.post('/getsalltudentscorebyclassesid/:ID',getAllStudentScoreClassId)
router.post('/updatestudentscore',updateStudentScore)
router.post('/addstudenttoclass',addStudentToClass)

router.post('/sumaryallstudentsemsub',sumaryALlStudentSemSub)


router.post('/getallrules',getAllRules)
router.post('/updateallrules',updateAllrules)
router.post('/deleteclassesbyid/:ID',deleteClassesWithID)
router.post('/addclassesbyname/:name',addClassesbyName)
router.post('/updateallclasses',updateAllClasses)


router.post('/deletesubjectbyid/:ID',deleteSubjectWitdhID)
router.post('/updateallsubject',updateAllSubject)
router.post('/addsubjectbyname',addSubjectByName)



export default router