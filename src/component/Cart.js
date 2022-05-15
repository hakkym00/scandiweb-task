import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../redux/store";
import ProductInCart from "./ProductInCart";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: store.getState().products.cartItems,
      currency: store.getState().products.currency,
      currentImage: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        cartItems: store.getState().products.cartItems,
        currency: store.getState().products.currency,
        Qty: "",
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { cartItems } = this.state;
    const totalPrices = [];
    const { currency } = this.state;

    return (
      <div className="Cart">
        <h4> CART</h4>
        <hr />
        <div className="cart_items">
          {cartItems.length === 0 ? (
            <div>No products on cart</div>
          ) : (
            cartItems.map((product, index) => {
              const currentCurrency = product.prices.find((price) => {
                return price.currency.symbol === currency;
              });
              totalPrices.push(
                Math.ceil(product.quantity * currentCurrency.amount)
              );
              return (
                <ProductInCart
                  key={product.id}
                  product={product}
                  index={index}
                  currentCurrency={currentCurrency}
                  cartItems={this.state.cartItems}
                />
              );
            })
          )}
        </div>
        {cartItems.length !== 0 && (
          <div className="cart_order">
            <div className="cart_display">
              <p className="cart_p_light"> Tax 21%:</p>
              <p className="cart_p_bold"> $42.00</p>
            </div>
            <div className="cart_display">
              <p className="cart_p_light">Quantity:</p>
              <p className="cart_p_bold">
                {this.state.cartItems.reduce((a, c) => a + c.quantity, 0)} items
              </p>
            </div>
            <div className="cart_display">
              <p className="cart_total">Total: </p>
              <p className="cart_p_bold">
                {this.state.currency}{" "}
                {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}
              </p>
            </div>
            <div className="cart_order_button">
              <button>ORDER</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    qunatityINC: (id) => dispatch({ type: "QUANTITY_INC", payload: id }),
    qunatityDEC: (id) => dispatch({ type: "QUANTITY_DEC", payload: id }),
    attributeChange: (newCartItems) =>
      dispatch({ type: "ATTRIBUTE__CHANGE", payload: newCartItems }),
  };
};

export default connect(null, mapDispatchToProps)(Cart);
