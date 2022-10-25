import { useEffect } from "react"
import { useAuth } from "./Context"
import { Outlet, useNavigate } from "react-router-dom"

const IsMember = () => {
    const { token } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    },[])
}

export default IsMember