import type { FC, ReactNode } from "react"
import Sidebar from "../../Components/Sidebar/Sidebar"
interface IProps {
    children: ReactNode
}

const UserLayout:FC<IProps> = ({ children }) => {
    return (
        <div className="user">
            <Sidebar />
            <div className="user_right">
                {children}
            </div>
        </div>
    )
}

export default UserLayout