import { Link, useParams } from "react-router-dom"
import UserLayout from "../Layouts/UserLayout/UserLayout"
import backArrow from "../assets/images/backArrow.svg";
import Btn from "../UI/Btn/Btn";
import basketicon from "../assets/images/basketIconImg.svg";
import star from "../assets/images/star.svg";
import { useGetProductIDQuery } from "../services/product";
import { basketStore } from "../store/basketStore";

const ProductId = () => {   
    const { id } = useParams()
    const { data: product } = useGetProductIDQuery(Number(id))
    const setBasket = basketStore(state => state.setBasket);
    const basket = basketStore(state => state.basket);
    const addProduct = () => {
        const find = basket?.find(product => product.id === Number(id))
        if (!find && product) {
            setBasket([...basket, { ...product, amount: 1 }])
        }
    }

        if (product) {
            const { image, description, price, quantity, rating, title } = product
            return (
                <UserLayout>
                    <div className="productid">
                        <div className="productid_top">
                            <div className="productid_top_left">
                                <Link to="/" className="productid_top_link">
                                    <img src={backArrow} alt="" />
                                </Link>
                                <h2 className="product_top_title">{title}</h2>
                            </div>
                            <Btn click={addProduct} text="Basket" width={143} height={43} icon={basketicon} mt={0} />
                        </div>
                        <div className="productid_box">
                            <img className="productid_box_img" src={image} alt="" />
                            <div className="productid_box_info">
                                <div className="productid_box_item">
                                    <h2 className="productid_box_item_title">Price</h2>
                                    <p className="productid_box_item_text">{price}<span>$</span></p>
                                </div>
                                <div className="productid_box_item">
                                    <h2 className="productid_box_item_title">Rating</h2>
                                    <p className="productid_box_item_rating">
                                        <span>{rating}</span>
                                        <img src={star} alt="" />
                                    </p>
                                </div>
                                <div className="productid_box_item">
                                    <h2 className="productid_box_item_title">Quantity</h2>
                                    <p className="productid_box_item_text">{quantity}</p>
                                </div>
                                <p className="productid_box_text">{description}</p>
                            </div>
                        </div>
                    </div>
                </UserLayout>
            )
        }
}

export default ProductId