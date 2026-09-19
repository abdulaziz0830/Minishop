    import Select, { type SingleValue } from "react-select";
    import type { Option } from "../../types";
    import { productStore } from "../../store/productStore";

    const Sort = () => {
        const setSelect = productStore(state => state.setSelect);
        const options = [
            { value: '', label: 'Default' },
            { value: 'title', label: 'Name' },
            { value: 'price', label: 'Price' },
            { value: 'rating', label: 'Rating' }
        ];
        const handleChange = (data: SingleValue<Option>) => {
            if (data) {
                setSelect(data.value);
            }
        }
        return (
            <Select
                className="select"
                onChange={handleChange}
                options={options}
                styles={{
                    control: (prop) => ({
                        ...prop,
                        borderRadius: "10px",
                        width: "200px",
                        outline: "unset",
                        color: "gray",
                        border: "2px solid #efefef",
                        background:"#FCFCVD" 
                    })
                }}
            />
        )
    }

    export default Sort