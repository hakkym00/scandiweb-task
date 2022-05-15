import React, { Component } from "react";
import { connect } from "react-redux";

export class ProductInCart extends Component {
  constructor(props) {
    super(props);

    this.state = { currentImage: 0 };
  }

  choiceHandler = (attributeName, itemID, index) => {
    const newCartItems = [...this.props.cartItems];
    newCartItems[index] = {
      ...this.props.cartItems[index],
      attributesSelected: {
        ...this.props.cartItems[index].attributesSelected,
        [attributeName]: itemID,
      },
    };

    this.props.attributeChange(newCartItems);
  };

  prevoiusImageHandler = (gallery, currentImage) => {
    if (currentImage > 0) {
      this.setState((prevState) => {
        return {
          currentImage: prevState.currentImage - 1,
        };
      });
    } else {
      this.setState({ currentImage: 0 });
    }
  };

  nextImageHandler = (gallery, currentImage) => {
    if (gallery.length - 1 > currentImage) {
      this.setState((prevState) => {
        return {
          currentImage: prevState.currentImage + 1,
        };
      });
    } else {
      this.setState({ currentImage: 0 });
    }
  };

  increment = (id) => {
    this.props.qunatityINC(id);
  };

  decrement = (id) => {
    this.props.qunatityDEC(id);
  };
  render() {
    const { product } = this.props;
    const { currentCurrency } = this.props;
    const { index } = this.props;
    return (
      <div>
        <div key={product.id} className=" cart_item">
          <div className="cart_item_details">
            <div>
              <p className="cart_detail_name">{product.name} </p>
              <p className="item_js7"> {product.brand} </p>
              <p className="item_js">
                {`${currentCurrency.currency.symbol} ${currentCurrency.amount}`}
              </p>
              <div className="col_three_attribute">
                {product.attributes.map((attribute) => {
                  return (
                    <div key={`${attribute.name}${Math.random() * 1000}`}>
                      <div className="modal_attribute_picked">
                        <p className="modal_attribute_name">
                          {attribute.name} :
                        </p>
                        <p>
                          {attribute.type === "text" ? (
                            product.attributesSelected[attribute.name]
                          ) : (
                            <p
                              style={{
                                background:
                                  product.attributesSelected[attribute.name],
                                height: "25px",
                                width: "25px",
                                margin: 0,
                              }}
                            ></p>
                          )}
                        </p>
                      </div>
                      <div className="col_three_box_size">
                        {attribute.items.map((item) => {
                          return (
                            <div
                              key={`${item.id}${Math.random() * 1000}`}
                              style={{
                                background:
                                  attribute.type === "swatch" && item.value,
                              }}
                              value={item.value}
                              className={
                                attribute.type === "text" &&
                                product.attributesSelected[attribute.name] ===
                                  item.id
                                  ? "notSwatch notSwatchbg"
                                  : attribute.type === "swatch"
                                  ? "swatch"
                                  : "notSwatch"
                              }
                              onClick={() =>
                                this.choiceHandler(
                                  attribute.name,
                                  item.id,
                                  index
                                )
                              }
                            >
                              {attribute.type === "swatch"
                                ? ""
                                : item.displayValue}
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
              <div className="col_two_quant_inc">
                <button onClick={() => this.increment(product.id)}> + </button>
              </div>
              <div style={{ fontWeight: "600" }}>{product.quantity}</div>
              <div className="col_two_quant_dec">
                <button onClick={() => this.decrement(product.id)}> - </button>
              </div>
            </div>
          </div>
          <div className="cartModal_col_two">
            <img
              className="media_img"
              src={product.gallery[this.state.currentImage]}
              width="230px"
              height="230px"
              alt=""
            />
            {product.gallery.length > 1 && (
              <div className="cart_changeImage">
                <img
                  className="image_previous"
                  onClick={() =>
                    this.prevoiusImageHandler(
                      product.gallery,
                      this.state.currentImage
                    )
                  }
                  src="/less.png"
                  alt=""
                />
                <img
                  className="image_next"
                  onClick={() =>
                    this.nextImageHandler(
                      product.gallery,
                      this.state.currentImage
                    )
                  }
                  src="/greater.png"
                  alt=""
                />
              </div>
            )}
          </div>
          <div
            className="productCart_remove"
            onClick={() => this.props.removeItem(product)}
          >
            X
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    qunatityINC: (id) => dispatch({ type: "QUANTITY_INC", payload: id }),
    qunatityDEC: (id) => dispatch({ type: "QUANTITY_DEC", payload: id }),
    removeItem: (product) =>
      dispatch({ type: "REMOVE_CART_ITEM", payload: product }),
    attributeChange: (newCartItems) =>
      dispatch({ type: "ATTRIBUTE__CHANGE", payload: newCartItems }),
  };
};

export default connect(null, mapDispatchToProps)(ProductInCart);
