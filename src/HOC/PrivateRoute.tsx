import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const PrivateRoute = () => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("access")
    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken])
  return (
    <Outlet />
  )
}

export default PrivateRoute