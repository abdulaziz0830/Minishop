import type { FC } from "react"

interface IBtnProps {
    text: string
    width: number
    height: number
    mt: number | string
    ma?: string
    disabled?: boolean
    icon?: string
    click?:()=>void
}

const Btn: FC<IBtnProps> = ({ text, width, height, mt, ma, disabled, icon, click }) => {
    return (
        <button onClick={click} disabled={disabled} className="btn" style={{
            width: width,
            height: height,
            marginTop: mt,
            marginLeft: ma,
            marginRight: ma
        }}>
            <img src={icon} alt="" />
            {text}
        </button>
    )
}

export default Btn