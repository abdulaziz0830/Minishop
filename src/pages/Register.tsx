
import { useForm } from "react-hook-form"
import Input from "../GenericInput/Input"
import Auth from "../Layouts/Auth/Auth"
import type { IRegister } from "../types"
import Btn from "../UI/Btn/Btn"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useRegisterMutation } from "../services/auth"
import { errorMessage } from "../utils/errorMessage"

const Register = () => {
  const [isError, setError] = useState<any>(null)
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<IRegister>({
    mode: "onChange"
  })

  const password = watch("password")
  const registerUser = async (data: IRegister) => {
    try {
      await registerMutation.mutateAsync(data)
      navigate("/login")
    } catch (error) {
      setError(errorMessage(error))
    }
    reset()
  }
  return (
    <Auth>
      <div className="login">
        <form className="login_form" onSubmit={handleSubmit(registerUser)}>
          <h2 className="login_title">Register</h2>
          <Input
            title="Your Username"
            type="text"
            holder="Username"
            register={register("username", {
              required: "Username is requried"
            })}
            error={errors.username}
          />
          <Input
            title="Your Email"
            type="email"
            holder="Email"
            register={register("email", {
              required: "Email is requried"
            })}
            error={errors.email}
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
          <Input
            title="Confirm Password"
            type="password"
            holder="Confirm Password"
            register={register("password2", {
              validate: (value) =>
                value == password || "Passwords do not match"
            })}
            error={errors.password2}
          />
          {
            isError && isError.map((message: string, i: number) => (
              <p key={i} style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
                {message}
              </p>
            ))
          }
          <Btn disabled={!isValid} text={"Register"} width={250} height={60} mt={50} ma={"auto"} />
        </form>
        <div className="login_info">
          <p className="login_info_text">Already have Account?</p>
          <Link to={"/login"} className="login_info_link">Login</Link>
        </div>
      </div>
    </Auth>
  )
}

export default Register