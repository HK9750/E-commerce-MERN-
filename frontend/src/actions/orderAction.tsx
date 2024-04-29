import axios from "axios";
import { BACKEND_URL, CLEAR_ERRORS } from "@/constants/productConstants";
import { Dispatch } from "@reduxjs/toolkit";
import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "@/constants/orderConstants";

export const createOrder = (order: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const { data } = await axios.post(`${BACKEND_URL}/order/new`, order, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getMyOrders = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/orders/me`);
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error: any) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
  }
};

export const getOrderDetails = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/order/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error: any) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Admin Actions

export const getAllOrders = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/admin/orders`);
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
  }
};

export const updateOrder =
  (id: string, orderData: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
      const { data } = await axios.put(
        `${BACKEND_URL}/admin/order/${id}`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteOrder = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`${BACKEND_URL}/admin/order/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
