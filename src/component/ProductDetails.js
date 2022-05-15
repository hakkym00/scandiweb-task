import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import store from "../redux/store";
import ProductOption from "./ProductOption";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: 0,
      currency: store.getState().products.currency,
      currentID: store.getState().products.productID,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        currency: store.getState().products.currency,
        currentID: store.getState().products.productID,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  displayImage = (index) => {
    this.setState({ currentImage: index });
  };
  render() {
    const { currentID } = this.state;
    const { currentImage } = this.state;

    const GET_DATA = gql`{
      product(id : ${JSON.stringify(currentID)}){
        id
        name
        description
        brand
        inStock
        gallery
        prices{
          amount
          currency{
            label
            symbol
          }
        }
        attributes{
          name
          type
          items{
            displayValue
            id
            value
          }
        }
      }
    }`;

    return (
      <Query query={GET_DATA}>
        {({ loading, data }) => {
          if (loading) {
            return <h1>Loading....</h1>;
          } else {
            const { currency } = this.state;
            const { product } = data;

            return (
              <div className="ProductDetails">
                <div className="productDetails_col_one">
                  {product.gallery.map((image, index) => {
                    return (
                      <div key={index} className="col_one_images">
                        <img
                          src={image}
                          alt=""
                          onClick={() => this.displayImage(index)}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="productDetails_col_two">
                  <img src={product.gallery[currentImage]} alt="" />
                </div>
                <div className="productDetails_col_three">
                  <p className="col_three_name">{product.name}</p>
                  <p className="col_three_use"> {product.brand} </p>
                  <ProductOption product={product} currency={currency} />
                </div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default ProductDetails;
