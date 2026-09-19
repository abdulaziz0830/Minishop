import { NavLink, useNavigate } from "react-router-dom"
import menuIcon from "../../assets/images/Menu.svg?react";
import basketIcon from "../../assets/images/basketicon.svg?react";
import profileIcon from "../../assets/images/Profile.svg?react";
import logoutIcon from "../../assets/images/Logout.svg";
import Btn from "../../UI/Btn/Btn";
import { useGetProfileQuery } from "../../services/user";
import { userStore } from "../../store/userStore";
import { useEffect } from "react";
import { basketStore } from "../../store/basketStore";

const Sidebar = () => {
    const navigate = useNavigate()
    const setUser = userStore(state => state.setUser)
    const basket = basketStore(state => state.basket)
    const user = userStore(state => state.user)
    const { data } = useGetProfileQuery()
    useEffect(() => {
        if (data) {
            setUser(data.data)
        }
    }, [data])
    const links = [
        { url: "/", name: "Menu", icon: menuIcon, },
        { url: "/basket", name: "Basket", icon: basketIcon, },
        { url: "/profile", name: "Profile", icon: profileIcon, },
    ]
    const logout = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        navigate("/login")
    }
    return (
        <div className="sidebar">
            {user ?
                <div className="sidebar_top">
                    <img className="sidebar_top_img" src={user.avatar || "/default-avatar.png"} alt="" />
                    <h2 className="sidebar_top_title">{user.username}</h2>
                    <a href={`mailto:${user.email}`} className="sidebar_top_gmail">{user.email}</a>
                </div>
                : ""}
            <div className="sidebar_list">
                {
                    links.map((link, i) => {
                        const Icon = link.icon
                        return (
                            <NavLink to={link.url} key={i} className="sidebar_list_link">
                                <Icon />
                                {link.name}
                                {link.name === "Basket" && basket.length ? <span >{basket.length}</span> : ""}
                            </NavLink>)
                    })
                }
            </div>
            <Btn click={logout} width={120} height={43} text="Logout" mt={"auto"} icon={logoutIcon} />
        </div>
    )
}

export default Sidebar