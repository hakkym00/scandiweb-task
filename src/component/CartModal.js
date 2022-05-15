import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../redux/store";

class CartModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: store.getState().products.cartItems,
      currency: store.getState().products.currency,
    };
  }

  choiceHandler = (attributeName, itemID, index) => {
    console.log(attributeName, itemID);

    const newCartItems = [...this.state.cartItems];
    newCartItems[index] = {
      ...this.state.cartItems[index],
      attributesSelected: {
        ...this.state.cartItems[index].attributesSelected,
        [attributeName]: itemID,
      },
    };

    this.props.attributeChange(newCartItems);

    // this.setState({
    //   cartItems: newCartItems,
    // });
    console.log(newCartItems);
  };

  increment = (id) => {
    this.props.qunatityINC(id);
  };

  decrement = (id) => {
    this.props.qunatityDEC(id);
  };

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
    console.log(cartItems);
    return (
      <div className="CartModal">
        <h3>
          My Bag,{" "}
          <span>
            {this.state.cartItems.reduce((a, c) => a + c.quantity, 0)} items
          </span>
        </h3>
        <hr />
        <div className="">
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
                <div key={product.id} className=" cartModal_item">
                  <div className="cartModal_item_details">
                    <div>
                      <p className="cartModal_detail_name">{product.name} </p>
                      <p className="cartModal_detail_name"> {product.brand} </p>
                      <p className="cartModal_detail_price">
                        {`${currentCurrency.currency.symbol} ${currentCurrency.amount}`}
                      </p>
                      <div className="modal_col_three_attribute">
                        {product.attributes.map((attribute) => {
                          return (
                            <div
                              key={`${attribute.name}${Math.random() * 1000}`}
                            >
                              <div className="modal_attribute_picked">
                                <div className="modal_attribute_name">
                                  {attribute.name} :
                                </div>
                                <div>
                                  {attribute.type === "text" ? (
                                    product.attributesSelected[attribute.name]
                                  ) : (
                                    <p
                                      style={{
                                        background:
                                          product.attributesSelected[
                                            attribute.name
                                          ],
                                        height: "20px",
                                        width: "20px",
                                        margin: 0,
                                      }}
                                    ></p>
                                  )}
                                </div>
                              </div>

                              <div className="modal_col_three_box_size">
                                {attribute.items.map((item) => {
                                  return (
                                    <div
                                      key={item.id}
                                      style={{
                                        background:
                                          attribute.type === "swatch" &&
                                          item.value,
                                      }}
                                      value={item.value}
                                      className={
                                        attribute.type === "text" &&
                                        product.attributesSelected[
                                          attribute.name
                                        ] === item.id
                                          ? "modal_notSwatch notSwatchbg"
                                          : attribute.type === "swatch"
                                          ? "modal_swatch"
                                          : "modal_notSwatch"
                                      }
                                    >
                                      {attribute.type === "swatch"
                                        ? ""
                                        : item.value}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col_two_quant_adjust">
                      <div className="modal_col_two_quant_inc">
                        <button onClick={() => this.increment(product.id)}>
                          {" "}
                          +{" "}
                        </button>
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        {product.quantity}
                      </div>
                      <div className="modal_col_two_quant_dec">
                        <button onClick={() => this.decrement(product.id)}>
                          {" "}
                          -{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cart_col_two">
                    <img
                      src={product.gallery[0]}
                      width="120px"
                      height="140px"
                      alt=""
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cartItems.length !== 0 && (
          <div className="cart_order">
            <div className="cartModal_total">
              <p>Total: </p>
              <p>
                {this.state.currency}{" "}
                {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}
              </p>
            </div>
            <div className="cartModal_action_button">
              <Link
                to="/cart/view"
                onClick={() => this.props.modalHandler()}
                className="cartModal_bag"
              >
                VIEW BAG
              </Link>
              <button className="cartModal_checkout">CHECKOUT</button>
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

export default connect(null, mapDispatchToProps)(CartModal);
