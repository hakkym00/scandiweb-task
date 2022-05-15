import { combineReducers, createStore } from "redux";
import productsReducer from "./reducers/productsReducer";

const reducer = combineReducers({ products: productsReducer });

const store = createStore(reducer);

export default store;
