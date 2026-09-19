import type { FC } from "react"

interface IProps {
    title?: string
    type: string
    holder?: string
    register: any
    error: any
    hidden?: boolean
}
const Input: FC<IProps> = ({ title, type, holder, register, error, hidden }) => {
    return (
        <>
            <label className="login_form_label">
                <span>{title}</span>
                <input
                    hidden={hidden}
                    type={type}
                    placeholder={holder}
                    {...register}
                />
            </label>
            <div className="login_form_error">
                <h3>{error?.message}</h3>
            </div>
        </>
    )
}

export default Input