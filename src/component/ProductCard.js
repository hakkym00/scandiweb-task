import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductCard extends Component {
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
      product.attributesSelected[attribute.name] = attribute.items[0].value;
    });

    this.setState({
      product: product,
    });
  };

  addToCartHandler = () => {
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
    this.props.addToCart(product);
  };

  componentDidMount() {
    this.createProductObject();
  }

  render() {
    const { product } = this.props;
    const { price } = this.props;

    return (
      <div className="ProductCard">
        <div className="productCard_details">
          <div className="productCard_image">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.gallery[0]}
                alt={product.name}
                onClick={() => {
                  this.props.changeProductID(product.id);
                }}
              />
            </Link>
          </div>
          <p
            onClick={() => {
              this.props.changeProductID(product.id);
            }}
            className="productCard_name"
          >
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </p>
          <p className="productCard_price">{`${price.currency.symbol} ${price.amount}`}</p>
        </div>
        {!product.inStock ? (
          <div className="productCard_outOfStock">
            <p>OUT OF STOCK</p>
          </div>
        ) : (
          <div
            className="productCard_cart"
            onClick={() => {
              this.addToCartHandler(product);
            }}
          >
            <img src="/empty-cart.svg" alt="" />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeProductID: (productID) =>
      dispatch({ type: "PRODUCTID_CHANGE", payload: productID }),
    addToCart: (item) => dispatch({ type: "ADD_TO_CART", payload: item }),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
