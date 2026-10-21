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
    const limit = productStore((state) => state.limit)
    const offset = productStore((state) => state.offset)
    const pageCount = Math.ceil(count / limit)

    if (pageCount <= 1) {
        return null
    }

    const currentPage = Math.floor(offset / limit)
    const handleSubmit = ({ selected }: ISelect) => {
        setOffset(selected * limit)
    }
    return (
        <ReactPaginate
            className="paginate"
            breakLabel="..."
            nextLabel=">>"
            pageRangeDisplayed={1}
            pageCount={pageCount}
            forcePage={currentPage}
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