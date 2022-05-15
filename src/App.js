import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./component/Header.js";
import "./App.css";
import Categories from "./component/Categories.js";
import ProductDetails from "./component/ProductDetails.js";
import Cart from "./component/Cart.js";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div className="App">
            <Header />

            <Routes>
              <Route path="/cart/:id" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/:id" element={<Categories />} />
              <Route path="/" element={<Categories />} />
            </Routes>
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
