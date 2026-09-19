import { Link } from "react-router-dom";
import not from "../assets/images/404.avif";
import back from "../assets/images/back.webp";

const NotFound = () => {
    return (
        <div className="notfound">
            <Link to="/" className="notfound_back">
                <img src={back} alt="" />
            </Link>
            <img src={not} alt="" />
        </div>
    )
}

export default NotFound