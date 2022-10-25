import { useEffect } from "react"
import { useAuth } from "./Context"
import { Outlet, useNavigate } from "react-router-dom"

const IsMember = () => {
    const { token } = useAuth()
    const navigate = useNavigate()
    console.log(localStorage.getItem('token'))
    useEffect(() => {
        if ((!localStorage.getItem('token')) && !token) { 
            navigate("/")
        }
    },[])

    return (
        <Outlet />
    )
}

export default IsMember