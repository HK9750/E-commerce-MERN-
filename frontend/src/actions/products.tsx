import axios from "axios";
import { Dispatch } from "redux";

import {
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  BACKEND_URL,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "@/constants/productConstants";

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
    currentPage: number,
    minPrice: number,
    maxPrice: number,
    category: string,
    ratings: number
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `${BACKEND_URL}/product?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;

      if (category) {
        link += `&category=${category}`;
      }

      const { data } = await axios.get(link);
      console.log(data);
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

export const createProduct = (product: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await axios.post(
      `${BACKEND_URL}/admin/product/new`,
      product,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const updateProduct =
  (id: string, product: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const { data } = await axios.put(
        `${BACKEND_URL}/admin/product/${id}`,
        product,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`${BACKEND_URL}/admin/product/${id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/admin/products`);
    dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const deleteReview =
  (id: string, productId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
      const { data } = await axios.delete(
        `${BACKEND_URL}/reviews?id=${id}&productId=${productId}`
      );
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };
