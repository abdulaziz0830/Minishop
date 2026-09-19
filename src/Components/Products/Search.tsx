import { useEffect, useState } from "react"
import searchIcon from "../../assets/images/Search.svg"
import { productStore } from "../../store/productStore";
import { useDebounce } from "use-debounce";
const Search = () => {
    const setSearch = productStore(state => state.setSEarch);
    const [value, setValue] = useState("")
    const [text] = useDebounce(value, 1000);
    useEffect(() => {
        setSearch(text);
    }, [text, setSearch])
    return (
        <form className="form">
            <label >
                <img src={searchIcon} alt="" />
                <input type="text" placeholder="Choose Food"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
        </form>
    )
}

export default Search