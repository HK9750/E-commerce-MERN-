import axios from "axios";
import { Dispatch } from "redux";

import { BACKEND_URL } from "@/constants/productConstants";

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
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
} from "@/constants/productConstants";

export const getProducts =
  (
    keyword: string = "",
    page: number,
    minPrice: number,
    maxPrice: number,
    category: string,
    ratings: number
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let link;

      link = `${BACKEND_URL}/product?keyword=${keyword}&page=${page}&ratings[gte]=${ratings}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;

      if (category) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&page=${page}&ratings[gte]=${ratings}&price[gte]=${minPrice}&price[lte]=${maxPrice}&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response?.data?.message || "Error fetching products",
      });
    }
  };

export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getProductDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/product/${id}`);
    console.log(data);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export interface ReviewData {
  rating: number;
  comment: string;
  productId: string;
}

export const createAndUpdateReview =
  (myForm: ReviewData) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST });
      const { data } = await axios.put(`${BACKEND_URL}/review`, myForm, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(data);
      dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getAllReviews = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/reviews?id=${id}`);
    console.log(data);
    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
