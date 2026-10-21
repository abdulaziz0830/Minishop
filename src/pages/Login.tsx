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
    const [isError, setError] = useState<string[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const loginMutation = useLoginMutation()
    const navigate = useNavigate()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isValid }
    } = useForm<ILogin>({ mode: "onChange" })

    const loginUser = async (data: ILogin) => {
        setIsLoading(true)
        setError(null)
        try {
            await loginMutation.mutateAsync(data)
            reset()
            navigate('/')
        } catch (error) {
            setError(errorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Auth>
            <div className="login">
                <form className="login_form" onSubmit={handleSubmit(loginUser)}>
                    <h2 className="login_title">Login</h2>
                    <Input
                        title="Your Email"
                        type="email"
                        holder="example@email.com"
                        register={register("username", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email"
                            }
                        })}
                        error={errors.username}
                    />
                    <Input
                        title="Your Password"
                        type="password"
                        holder="Min 8 characters"
                        register={register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Minimum 8 characters"
                            }
                        })}
                        error={errors.password}
                    />
                    {
                        isError && isError.map((message: string, i: number) => (
                            <p key={i} style={{ color: "red", marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
                                {message === "Cannot find user" ? "Email or password is incorrect" : message}
                            </p>
                        ))
                    }
                    <Btn
                        disabled={!isValid || isLoading}
                        text={isLoading ? "Loading..." : "Login"}
                        width={250}
                        height={52}
                        mt={30}
                        ma={"auto"}
                    />
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