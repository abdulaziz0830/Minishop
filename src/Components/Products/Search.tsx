import { useEffect, useState } from "react"
import searchIcon from "../../assets/images/Search.svg"
import { productStore } from "../../store/productStore";
import { useDebounce } from "use-debounce";
const Search = () => {
    const setSearch = productStore(state => state.setSearch);
    const setOffset = productStore(state => state.setOffset);
    const [value, setValue] = useState("")
    const [text] = useDebounce(value, 400);
    useEffect(() => {
        setSearch(text);
        setOffset(0);
    }, [text, setSearch, setOffset])
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
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