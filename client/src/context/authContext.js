import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    const [curentUser, setCurentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)


    const login = async (user) => {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8800/api/auth/login', // my Node server on 8800 port   
            data: user,
            withCredentials: true
        })
        setCurentUser(res.data)
    }
    const logout = async (user) => {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8800/api/auth/logout', // my Node server on 8800 port   
            withCredentials: true
        })
        setCurentUser(null)
    }
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(curentUser))
    }, [curentUser])
    const [refresh,setRefresh]=useState(true)

    return <AuthContext.Provider value={{ curentUser, login, logout,setRefresh,refresh }}>
        {children}
    </AuthContext.Provider>
}
