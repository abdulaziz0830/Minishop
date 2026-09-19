import { useForm } from "react-hook-form"
import Auth from "../Layouts/Auth/Auth"
import Btn from "../UI/Btn/Btn"
import type { ILogin } from "../types"
import Input from "../GenericInput/Input"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../services/auth"
import { useState } from "react"
import { errorMessage } from "../utils/errorMessage"

const Login = () => {
    const [isError, setError] = useState<any>(null)
    const loginMutation = useLoginMutation()
    const navigate = useNavigate()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isValid }
    } = useForm<ILogin>()

    const loginUser = async (data: ILogin) => {
        try {
            await loginMutation.mutateAsync(data)
            navigate('/')
            setError('')
        } catch (error) {
            setError(errorMessage(error))
        }
        reset()
    }
    return (
        <Auth>
            <div className="login">
                <form className="login_form" onSubmit={handleSubmit(loginUser)}>
                    <h2 className="login_title">Login</h2>
                   <Input
    title="Your Email"
    type="email"
    holder="Email"
    register={register("username", {
        required: "Email is requried"
    })}
    error={errors.username}
/>
                    <Input
                        title="Your Password"
                        type="password"
                        holder="Password"
                        register={register("password", {
                            required: "Password is requried",
                            minLength: {
                                value: 8,
                                message: "Minimum 8 symbols"
                            }
                        })}
                        error={errors.password}
                    />
                    {
                        isError && isError.map((message: string, i: number) => (
                            <p key={i} style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
                                {message}
                            </p>
                        ))
                    }
                    <Btn disabled={!isValid} text={"Login"} width={250} height={60} mt={50} ma={"auto"} />
                </form>
                <div className="login_info">
                    <p className="login_info_text">No Account?</p>
                    <Link to={"/register"} className="login_info_link">Register</Link>
                </div>
            </div>
        </Auth>
    )
}

export default Login