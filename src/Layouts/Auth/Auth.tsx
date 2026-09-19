import type { FC, ReactNode } from "react";
import authImg from "../../assets/images/authImg.svg";
interface IProps {
    children: ReactNode
}

const Auth: FC<IProps> = ({ children }) => {
    return (
        <div className="auth">
            <div className="auth_left">
                <img src={authImg} alt="" />
            </div>
            <div className="auth_right">
                {children}
            </div>
        </div>
    )
}

export default Auth