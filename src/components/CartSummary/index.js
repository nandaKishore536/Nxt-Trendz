import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let c = 0
      cartList.forEach(each => {
        c += each.price * each.quantity
      })

      return (
        <div className="SummaryCon">
          <h1 className="mainH1">
            Order Total: <span className="span">Rs {c}/-</span>
          </h1>
          <p className="par">{cartList.length} items in cart</p>
          <button type="button" className="checkOut">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
