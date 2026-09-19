import { useState } from "react"
import UserLayout from "../Layouts/UserLayout/UserLayout"
import { useForm } from "react-hook-form"
import type { IChangeProfile } from "../types"
import Btn from "../UI/Btn/Btn"
import Input from "../GenericInput/Input"
import { errorMessage } from "../utils/errorMessage"
import profileIcon from "../assets/images/profileIcon.svg";
import { userStore } from "../store/userStore"
import { useUpdateAvatar, useUpdateProfile } from "../services/auth"

const Profile = () => {
  const [isError, setError] = useState<any>(null)
  const updateProfile = useUpdateProfile()
  const updateAvatar = useUpdateAvatar()
  const user = userStore(state => state.user)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm<IChangeProfile>()

  const changeProfile = async (data: IChangeProfile) => {
    const { username, password, avatar, email } = data
    const info = { username, password, email }
    if (user) {
      try {
        await updateProfile.mutateAsync({ data: info, id: user.id })
        setError('')
      } catch (error) {
        setError(errorMessage(error))
      }
      try {
        if (avatar) {
          await updateAvatar.mutateAsync({ data: avatar[0], id: user.id })
        }
        setError('')
      } catch (error) {
        setError(errorMessage(error))
      }
    }
    reset()
  }
  return (
    <UserLayout>
      <div className="login">
        <form className="login_form" onSubmit={handleSubmit(changeProfile)}>
          <h2 className="login_title">Change Profile</h2>
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
              required: "Email is requried",
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
          <label className="login_form_change">
            <span>Change Photo</span>
            <img className="login_form_change_img" src={profileIcon} alt="" />
            <Input
              hidden={true}
              type="file"
              register={register("avatar")}
              error={errors.avatar}
            />
          </label>
          {
            isError && isError.map((message: string, i: number) => (
              <p key={i} style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
                {message}
              </p>
            ))
          }
          <Btn disabled={!isValid} text={"Login"} width={250} height={60} mt={0} ma={"auto"} />
        </form>
      </div>
    </UserLayout>
  )
}

export default Profile