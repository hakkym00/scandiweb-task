import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../redux/store";
import CartModal from "./CartModal";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesType: "all",
      currency: store.getState().products.currency,
      currencySwitch: false,
      caret: "caret-down",
      cartItems: store.getState().products.cartItems,
      displayModal: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        currency: store.getState().products.currency,
        cartItems: store.getState().products.cartItems,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  categoryTypeHandler = (type) => {
    this.setState({ categoriesType: type });

    store.dispatch({ type: "CATEGORY_UPDATE", payload: type });
  };
  handleCurrency = (currency) => {
    store.dispatch({ type: "CURRENCY_CHANGE", payload: currency });
    this.setState({ currencySwitch: false, caret: "caret-down" });
  };

  displayCurrencyOptions = () => {
    if (!this.state.currencySwitch) {
      this.setState({ currencySwitch: true, caret: "caret-up" });
    } else {
      this.setState({ currencySwitch: false, caret: "caret-down" });
    }
  };

  displayModalHandler = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        displayModal: !prevState.displayModal,
      };
    });
  };

  render() {
    const { caret } = this.state;
    return (
      <div className="Header_container">
        <div className="Header">
          <div className="header_categories">
            <Link
              to="/"
              onClick={() => this.categoryTypeHandler("all")}
              className={this.state.categoriesType === "all" ? "active" : null}
            >
              ALL
            </Link>
            <Link
              to="clothes"
              onClick={() => this.categoryTypeHandler("clothes")}
              className={
                this.state.categoriesType === "clothes" ? "active" : null
              }
            >
              CLOTHES
            </Link>
            <Link
              to="/tech"
              onClick={() => this.categoryTypeHandler("tech")}
              className={this.state.categoriesType === "tech" ? "active" : null}
            >
              TECH
            </Link>
          </div>
          <div className="header_image">
            <img src="/a-logo.svg" alt="" />
          </div>
          <div className="header_icon_cart">
            <div className="currencyOptions">
              <p onClick={this.displayCurrencyOptions}>
                {this.state.currency}
                <span>
                  {" "}
                  <img src={`/${caret}.svg`} alt="" />{" "}
                </span>
              </p>
              {this.state.currencySwitch && (
                <div className="header_icon_absolute">
                  <p
                    className="currencyOption"
                    onClick={() => this.handleCurrency("$")}
                    value="USD"
                  >
                    $ USD
                  </p>
                  <p
                    className="currencyOption"
                    onClick={() => this.handleCurrency("A$")}
                    value="GBP"
                  >
                    A$ AUD
                  </p>
                  <p
                    className="currencyOption"
                    onClick={() => this.handleCurrency("¥")}
                    value="AUD"
                  >
                    ¥ JPY
                  </p>
                  <p
                    className="currencyOption"
                    onClick={() => this.handleCurrency("₽")}
                    value="AUD"
                  >
                    ₽ RUB
                  </p>
                </div>
              )}
            </div>
            <div className="headerimg_cart">
              <img
                src="/cart.png"
                alt="cart"
                onClick={this.displayModalHandler}
              />
              <p>{this.state.cartItems.reduce((a, c) => a + c.quantity, 0)}</p>
            </div>
          </div>
        </div>
        {this.state.displayModal && (
          <div className="displayModal">
            <CartModal modalHandler={this.displayModalHandler} />
          </div>
        )}
      </div>
    );
  }
}

export default Header;
