import React, { Component } from "react";
import ProductCard from "./ProductCard";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import store from "../redux/store";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: store.getState().products.category,
      currency: store.getState().products.currency,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        category: store.getState().products.category,
        currency: store.getState().products.currency,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const activeCategory = this.state.category;

    const getProducts = gql`
      {
        category(input: { title: ${JSON.stringify(activeCategory)} }) {
          name
          products {
            id
            name
            description
            brand
            inStock
            gallery
            prices {
              amount
              currency {
                label
                symbol
              }
            }
            attributes {
              name
              type
              items {
                displayValue
                id
                value
              }
            }
          }
        }
      }
    `;

    return (
      <Query query={getProducts}>
        {({ loading, data }) => {
          if (loading) {
            return <h1>Loading....</h1>;
          } else {
            const { products } = data.category;
            return (
              <div className="Categories">
                <h2>
                  {activeCategory.charAt(0).toUpperCase() +
                    activeCategory.slice(1)}{" "}
                  Products
                </h2>
                <div className="ProductsContainer">
                  {products.map((product) => {
                    const currentCurrencyPrice = product.prices.find(
                      (currency) =>
                        currency.currency.symbol === this.state.currency
                    );
                    return (
                      <ProductCard
                        product={product}
                        price={currentCurrencyPrice}
                        key={product.id}
                      />
                    );
                  })}
                </div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default Categories;
