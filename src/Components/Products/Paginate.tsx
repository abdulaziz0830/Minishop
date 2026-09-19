import ReactPaginate from "react-paginate"
import { productStore } from "../../store/productStore";
import type { FC } from "react";
interface ISelect {
    selected: number;
}
interface IProps {
    count: number;
}
const Paginate: FC<IProps> = ({ count }) => {
    const setOffset = productStore((state) => state.setOffset)
    const handleSubmit = ({ selected }: ISelect) => {
        setOffset(selected * 6)
    }
    return (
        <ReactPaginate
            className="paginate"
            breakLabel="..."
            nextLabel=">>"
            pageRangeDisplayed={1}
            pageCount={Math.ceil(count / 6)}
            previousLabel="<<"
            pageLinkClassName="paginate_link"
            activeClassName="paginate_active"
            nextClassName="paginate_next"
            previousClassName="paginate_prev"
            breakClassName="paginate_break"
            onPageChange={handleSubmit}
        />
    )
}

export default Paginate