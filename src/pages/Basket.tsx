import UserLayout from "../Layouts/UserLayout/UserLayout"
import deleteIcon from "../assets/images/deleteIcon.svg";
import { basketStore } from "../store/basketStore";
const Basket = () => {
  const basket = basketStore(state => state.basket);
  const setBasket = basketStore(state => state.setBasket);
  const changeCount = (id: number, sym: string) => {
    if (sym === "plus") {
      setBasket(basket.map(product => product.id === id ? { ...product, amount: product.amount + 1 } : product))
    } else if (sym === "minus") {
      setBasket(basket.map(product => product.id === id ? { ...product, amount: product.amount - 1 } : product).filter(product => product.amount > 0))
    } else if (sym === "del") {
      setBasket(basket.filter(product => product.id !== id))
    }
  }

  const totalPrice = basket.reduce((sum, item) => sum + item.price * item.amount, 0)

  return (
    <UserLayout>
      <div className="basket">
        <h2 className="basket_title">Basket</h2>
        <div className="basket_box">
          {
            basket.length ? (
              <>
                {basket.map(product => (
                  <div className="basket_card" key={product.id}>
                    <img src={product.image} alt="" className="basket_card_img" />
                    <div className="basket_info">
                      <h3 className="basket_info_title">{product.title}</h3>
                      <p className="basket_info_price">{product.price}$</p>
                    </div>
                    <div className="basket_btns">
                      <button className="basket_btns_minus" onClick={() => changeCount(product.id, "minus")}><span></span></button>
                      <p className="basket_btns_amount">{product.amount}</p>
                      <button className="basket_btns_plus" onClick={() => changeCount(product.id, "plus")}>+</button>
                      <button className="basket_btns_del" onClick={() => changeCount(product.id, "del")}>
                        <img src={deleteIcon} alt="" />
                      </button>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", padding: "15px", borderTop: "2px solid #eee" }}>
                  <h3 style={{ fontSize: "22px" }}>Total:</h3>
                  <h3 style={{ fontSize: "22px", color: "#FE724C" }}>{totalPrice.toFixed(2)}$</h3>
                </div>
              </>
            )
            : <h2>Basket is empty</h2>
          }

        </div>
      </div>
    </UserLayout>
  )
}

export default Basket