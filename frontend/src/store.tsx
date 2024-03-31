import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailsReducer,
  createReviewReducer,
  allReviewsReducer,
} from "./reducers/productReducer";
import {
  loadUserReducer,
  loginUserReducer,
  logoutUserReducer,
  registerUserReducer,
} from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    createReview: createReviewReducer,
    allReviews: allReviewsReducer,
    registerUser: registerUserReducer,
    loginUser: loginUserReducer,
    loadUser: loadUserReducer,
    logoutUser: logoutUserReducer,
  },
});

export default store;
