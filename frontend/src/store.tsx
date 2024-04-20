import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  productReducer,
  productDetailsReducer,
  createReviewReducer,
  allReviewsReducer,
} from "./reducers/productReducer";
import {
  forgetPassReducer,
  updatePassReducer,
  updateUserReducer,
  userReducer,
  logoutReducer,
} from "./reducers/userReducer";
import { cartReducer, CartState } from "@/reducers/cartReducer";
import { createOrder } from "./reducers/orderReducer";
const cartItemsString = localStorage.getItem("cartItems");
const shoppingInfoString = localStorage.getItem("shippingInfo");
const preloadedState: Partial<{
  products: any;
  productDetails: any;
  createReview: any;
  allReviews: any;
  user: any;
  updateProfile: any;
  updatePassword: any;
  forgetPassword: any;
  logoutReducer: any;
  cart: CartState;
  order: any;
}> = {
  cart: {
    cartItems: cartItemsString ? JSON.parse(cartItemsString) : [],
    shippingInfo: shoppingInfoString
      ? JSON.parse(shoppingInfoString)
      : {
          address: "",
          city: "",
          state: "",
          country: "",
          pinCode: "",
          phoneNo: "",
        },
  },
  user: {
    user: JSON.parse(sessionStorage.getItem("user") || "{}"),
  },
};

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  createReview: createReviewReducer,
  allReviews: allReviewsReducer,
  user: userReducer,
  logout: logoutReducer,
  updateProfile: updateUserReducer,
  updatePassword: updatePassReducer,
  forgetPassword: forgetPassReducer,
  cart: cartReducer,
  order: createOrder,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
