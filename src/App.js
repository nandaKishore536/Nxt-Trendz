import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const x = cartList.filter(each => each.id === product.id)
    const l = x.length
    if (l === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const item = x[0]
      const q = product.quantity + item.quantity
      item.quantity = q

      cartList.forEach(each =>
        each.id === product.id ? each.quantity === q : null,
      )
      const sub = cartList
      console.log(sub)
      this.setState({cartList: sub})
    }
  }

  removeCartItem = product => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== product)
    this.setState({cartList: newList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = details => {
    const {cartList} = this.state
    const x = cartList.find(each => each.id === details.id)
    const y = x.quantity + 1
    cartList.forEach(each =>
      each.id === details.id ? each.quantity === y : null,
    )
  }

  decrementCartItemQuantity = details => {
    const {cartList} = this.state
    const x = cartList.find(each => each.id === details.id)
    if (x.quantity > 0) {
      const y = x.quantity - 1
      cartList.forEach(each =>
        each.id === details.id ? each.quantity === y : null,
      )
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
