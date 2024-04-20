import {
  ADD_TO_CART,
  SAVE_SHIPPING_INFO,
  REMOVE_ITEM_CART,
} from "@/constants/cartConstants";
import axios from "axios";
import { BACKEND_URL } from "@/constants/productConstants";
import { Dispatch } from "@reduxjs/toolkit";

export const addItemToCart =
  (id: string, quantity: number) => async (dispatch: any, getState: any) => {
    const { data } = await axios.get(`${BACKEND_URL}/product/${id}`);
    console.log(data);
    const payloadData = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0],
      stock: data.product.stock,
      quantity,
    };
    console.log(payloadData);
    dispatch({
      type: ADD_TO_CART,
      payload: payloadData,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const RemoveItemsFromCart =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: REMOVE_ITEM_CART,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingInfo = (data: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
