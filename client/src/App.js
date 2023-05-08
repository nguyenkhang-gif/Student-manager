import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';
import Register from './pages/register.jsx';
import Addstudent from './pages/addstudent';
import Home from './pages/Home';
import { Children } from 'react';
import Classes from './pages/Classes';
import axios from 'axios';
import RealRegister from './pages/realRegister';
import Student from './pages/student';
import FindStudent from './pages/findStudent';
import Editscore from './pages/editscore';
import SubjectScore from './pages/subjectScore';
import SummaryAllStudent from './pages/sumaryAllStudent';
import Rulespage from './pages/rulespage';


const Layout = ()=>{
  return (<div>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
  </div>)
}

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/allstudent',
        element:<h1>allstudent</h1>
      },
      {
        path:'/student/:id',
        element:<Student/>
      },
      {
        path:'/editscore/:id',
        element:<Editscore/>
      },
      {
        path:'/findstudent',
        element:<FindStudent/>
      },
      {
        path:'/addstudent',
        element:<Addstudent/>
      },
      {
        path:'/classes',
        element:<Classes/>
      },
      {
        path:'/register',
        element:<RealRegister/>
      },
      {
        path:'/subjectscores',
        element:<SubjectScore/>
      },
      {
        path:'/login',
        element:<Register/>
      },
      {
        path:'/sumary',
        element:<SummaryAllStudent/>
      },
      {
        path:'/rules',
        element:<Rulespage/>
      }
    ]
  },
 
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
