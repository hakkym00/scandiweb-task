const productID = window.location.pathname.split("/")[2];

const initialState = {
  category: "all",
  currency: "$",
  productID,
  cartItems: [],
};

const productsReducer = (state = initialState, { type, payload }) => {
  if (type === "CATEGORY_UPDATE") {
    return {
      ...state,
      category: payload,
    };
  }
  if (type === "CURRENCY_CHANGE") {
    return {
      ...state,
      currency: payload,
    };
  }
  if (type === "PRODUCTID_CHANGE") {
    return {
      ...state,
      productID: payload,
    };
  }

  if (type === "ADD_TO_CART") {
    const item = payload;
    console.log(item);
    // const product = state.cartItems.find((x) => x.id === item.id);
    // if (product) {
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((x) => (x.id !== product.id ? item : x)),
    //   };
    // } else {
    return { ...state, cartItems: [...state.cartItems, item] };
    // }
  }

  if (type === "REMOVE_CART_ITEM") {
    const newCartItems = state.cartItems.filter((item) => item !== payload);
    // localStorage.setItem();

    return {
      ...state,
      cartItems: newCartItems,
    };
  }
  if (type === "ATTRIBUTE__CHANGE") {
    return {
      ...state,
      cartItems: payload,
    };
  }
  if (type === "QUANTITY_INC") {
    const updatedCart = state.cartItems.map((item) => {
      if (item.id === payload) {
        if (item.quantity < 10) {
          return {
            ...item,
            quantity: Number(item.quantity) + 1,
          };
        } else return item;
      } else return item;
    });

    // localStorage.setItem();

    return {
      ...state,
      cartItems: updatedCart,
    };
  }

  if (type === "QUANTITY_DEC") {
    const updatedCart = state.cartItems.map((item) => {
      if (item.id === payload) {
        if (item.quantity > 1) {
          return {
            ...item,
            quantity: Number(item.quantity) - 1,
          };
        } else return item;
      } else return item;
    });
    // localStorage.setItem();
    return {
      ...state,
      cartItems: updatedCart,
    };
  }
  return state;
};

export default productsReducer;
