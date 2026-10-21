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
  const [isError, setError] = useState<string[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    setError(null)
    try {
      const { username, email, password: userPassword } = data
      await registerMutation.mutateAsync({ username, email, password: userPassword } as IRegister)
      reset()
      navigate("/login")
    } catch (error) {
      const msgs = errorMessage(error)
      // json-server-auth xatolarini o'zbek/ingliz tilida ko'rsatish
      const mapped = msgs.map(m => {
        if (m.toLowerCase().includes("email already exists") || m.toLowerCase().includes("email_already_exists")) {
          return "This email is already registered"
        }
        if (m.toLowerCase().includes("cannot read") || m.toLowerCase().includes("500")) {
          return "Server error. Please try again"
        }
        return m
      })
      setError(mapped)
    } finally {
      setIsLoading(false)
    }
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
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 characters" }
            })}
            error={errors.username}
          />
          <Input
            title="Your Email"
            type="email"
            holder="example@email.com"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email"
              }
            })}
            error={errors.email}
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
          <Input
            title="Confirm Password"
            type="password"
            holder="Repeat password"
            register={register("password2", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
            error={errors.password2}
          />
          {
            isError && isError.map((message: string, i: number) => (
              <p key={i} style={{ color: "red", marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
                {message}
              </p>
            ))
          }
          <Btn
            disabled={!isValid || isLoading}
            text={isLoading ? "Loading..." : "Register"}
            width={250}
            height={52}
            mt={30}
            ma={"auto"}
          />
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