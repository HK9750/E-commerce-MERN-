import axios from "axios";
import { BACKEND_URL } from "@/constants/productConstants";
import { Dispatch } from "@reduxjs/toolkit";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
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
