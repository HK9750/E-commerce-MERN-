import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CREATE_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
} from "@/constants/productConstants";

import { Product, Review } from "../pages/Product/ProductTypes";

export interface ProductState {
  loading: boolean;
  success: boolean;
  products: Product[];
  product?: Partial<Product>;
  reviews: Review[];
  error: any;
  productsCount: number;
  filteredProductsCount: number;
  resultPerPage: number;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  success: false,
  product: {},
  reviews: [],
  error: null,
  productsCount: 0,
  filteredProductsCount: 0,
  resultPerPage: 0,
};

export const productReducer = (
  state: ProductState = initialState,
  action: any
): ProductState => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        filteredProductsCount: action.payload.filteredProductsCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state: ProductState = initialState,
  action: any // You can define your action types properly here
): ProductState => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allReviewsReducer = (
  state: ProductState = initialState,
  action: any // You can define your action types properly here
): ProductState => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const createReviewReducer = (
  state: ProductState = initialState,
  action: any
): ProductState => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case CREATE_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
