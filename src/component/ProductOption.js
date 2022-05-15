import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        attributesSelected: {},
      },
    };
  }

  createProductObject = () => {
    const product = {
      name: this.props.product.name,
      prices: this.props.product.prices,
      gallery: this.props.product.gallery,
      brand: this.props.product.brand,
      quantity: 1,
      id: this.props.product.id,
      attributes: this.props.product.attributes,
      attributesSelected: {},
    };

    this.props.product.attributes.forEach((attribute) => {
      product.attributesSelected[attribute.name] = attribute.items[0].id;
    });

    this.setState({
      product: product,
    });
  };

  componentDidMount() {
    this.createProductObject();
  }

  // addToCartHandler = () => {
  //   if (
  //     Object.values(this.state.product.attributesSelected).every(
  //       (value) => value
  //     )
  //   ) {
  //     this.props.addToCart(this.state.product);
  //   } else {
  //     this.setState({ linkTo: `/product/${this.state.product.id}` });
  //     alert("Please select product attributes");
  //   }
  // };

  addToCartHandler = () => {
    this.props.addToCart(this.state.product);
  };

  choiceHandler = (attributeName, itemID) => {
    this.setState({
      product: {
        ...this.state.product,

        attributesSelected: {
          ...this.state.product.attributesSelected,
          [attributeName]: itemID,
        },
      },
    });
  };

  // cartHandler = () => {
  //   this.props.addtoCart(this.state.product);
  //   this.createProductObject();
  // };

  render() {
    const { product, currency } = this.props;
    const currentCurrency = product.prices.find((price) => {
      return price.currency.symbol === currency;
    });

    console.log(product);

    console.log(this.state.product.attributesSelected);

    return (
      <div className="ProductOption">
        <div className="col_three_attribute">
          {product.attributes.map((attribute) => {
            console.log(`${attribute.id}${Math.random() * 1000}`);
            return (
              <div key={`${attribute.name}${Math.random() * 1000}`}>
                <div className="modal_attribute_picked">
                  <p className="modal_attribute_name">{attribute.name} :</p>
                  <p>
                    {attribute.type === "text" ? (
                      this.state.product.attributesSelected[attribute.name]
                    ) : (
                      <p
                        style={{
                          background:
                            this.state.product.attributesSelected[
                              attribute.name
                            ],
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
                          background: attribute.type === "swatch" && item.value,
                        }}
                        name={item.name}
                        value={item.value}
                        className={
                          attribute.type === "text" &&
                          this.state.product.attributesSelected[
                            attribute.name
                          ] === item.id
                            ? "notSwatch notSwatchbg"
                            : attribute.type === "swatch"
                            ? "swatch"
                            : "notSwatch"
                        }
                        onClick={() =>
                          this.choiceHandler(attribute.name, item.id)
                        }
                      >
                        {attribute.type === "swatch" ? "" : item.displayValue}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="col_three_attribute">
          <div className="col_three_price">
            <p className="col_three_price_text">PRICE:</p>
            <p className="col_three_price_amount">
              {currentCurrency.currency.symbol}
              {currentCurrency.amount}
            </p>
          </div>

          {product.inStock ? (
            <Link
              className="addToCart_button"
              onClick={() => {
                this.addToCartHandler(product);
              }}
              to={`/cart/${product.id}`}
            >
              ADD TO CART
            </Link>
          ) : (
            <div
              className={
                product.inStock ? `col_three_add_toCart` : "OutOfStock "
              }
            >
              <button disabled>OUT OF STOCK</button>
            </div>
          )}
          <div className="col_three_desc">
            {product.description.replace(/<[^>]*>/g, "")}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch({ type: "ADD_TO_CART", payload: item }),
  };
};

export default connect(null, mapDispatchToProps)(ProductOption);
