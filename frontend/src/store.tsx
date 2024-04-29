import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  productReducer,
  productDetailsReducer,
  createReviewReducer,
  allReviewsReducer,
  CreateProductReducer,
  DelUpdProductReducer,
} from "./reducers/productReducer";
import {
  forgetPassReducer,
  updatePassReducer,
  updateUserReducer,
  userReducer,
  logoutReducer,
  adminUsersReducer,
} from "./reducers/userReducer";
import { cartReducer, CartState } from "@/reducers/cartReducer";
import {
  OrderDetails,
  adminOrdersReducer,
  createOrder,
  myOrder,
} from "./reducers/orderReducer";
const cartItemsString = localStorage.getItem("cartItems");
const shoppingInfoString = localStorage.getItem("shippingInfo");
const preloadedState: Partial<{
  products: any;
  productDetails: any;
  createproduct: any;
  delupdateproduct: any;
  createReview: any;
  allReviews: any;
  user: any;
  updateProfile: any;
  updatePassword: any;
  forgetPassword: any;
  logoutReducer: any;
  adminUsers: any;
  cart: CartState;
  createorder: any;
  myorder: any;
  orderDetails: any;
  adminOrder: any;
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
  createproduct: CreateProductReducer,
  delupdateproduct: DelUpdProductReducer,
  createReview: createReviewReducer,
  allReviews: allReviewsReducer,
  user: userReducer,
  logout: logoutReducer,
  updateProfile: updateUserReducer,
  updatePassword: updatePassReducer,
  forgetPassword: forgetPassReducer,
  adminUsers: adminUsersReducer,
  cart: cartReducer,
  createorder: createOrder,
  myorder: myOrder,
  orderDetails: OrderDetails,
  adminOrder: adminOrdersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
