import starIcon from "../../assets/images/star.svg";
import basketIcon from "../../assets/images/basketIconImg.svg";
import { useEffect, useState } from "react";
import type { IProduct } from "../../types";
import { useGetProductsQuery } from "../../services/product";
import { productStore } from "../../store/productStore";
import Paginate from "./Paginate";
import Skleton from "./Skleton";
import Sort from "./Sort";
import Search from "./Search";
import { basketStore } from "../../store/basketStore";
import { Link } from "react-router-dom";
const Products = () => {
    const [count, setCount] = useState(0)
    const { products, setProducts, limit, offset, select, search } = productStore();
    const basket = basketStore(state => state.basket);
    const setBasket = basketStore(state => state.setBasket);
    const { data } = useGetProductsQuery(offset, limit, select, search);
    useEffect(() => {
        if (data) {
            const products = data.results.map((product: IProduct) => {
                return { ...product, amount: 0 }
            })
            setCount(data.count)
            setProducts(products)
        }
    }, [data, setProducts])
    const skleton = [...Array(6)].map((_, i) => <Skleton key={i} />)
    const addProduct = (id: number) => {
        const find = basket?.find(product => product.id === id)
        if (!find) {
            const productToAdd = products?.find(product => product.id === id)
            if (productToAdd) {
                setBasket([...basket, {...productToAdd,amount: 1}])
            }
        }
    }
    return (
        <div className="product">
            <div className="product_nav">
                <div className="product_nav_left">
                    <h2 className="product_nav_title">Menu</h2>
                    <Sort />
                </div>
                <Search />
            </div>
            <div className="product_box">
                {
                    products ?
                        products.map(product => (
                            <div className="product_card" key={product.id}>
                                <Link to={`/${product.id}`}>
                                    <img src={product.image} alt="" className="product_card_img" />
                                    <div className="product_card_info">
                                        <p className="product_card_rating">
                                            <span>{product.rating}</span>
                                            <img src={starIcon} alt="" />
                                        </p>
                                        <h3 className="product_card_title">
                                            {product.title}
                                        </h3>
                                        <p className="product_card_text">{product.description}</p>
                                    </div>
                                    <p className="product_card_price">
                                        {product.price}
                                        <span>$</span>
                                    </p>
                                </Link>
                                <button className="product_card_btn" onClick={() => addProduct(product.id)}>
                                    <img src={basketIcon} alt="" />
                                </button>
                            </div>
                        ))
                        :

                        skleton.map((item, i) => (
                            <div className="product_card" key={i}>
                                {item}
                            </div>
                        ))
                }
            </div>
            <Paginate count={count} />
        </div>
    )
}

export default Products