import axios from "axios";
import { Dispatch } from "redux";
import { RegisterUser, LoginUser } from "@/pages/Auth/AuthTypes";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
} from "@/constants/userConstants";
import { BACKEND_URL } from "@/constants/productConstants";

export const registerUser =
  (formData: RegisterUser) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const { data } = await axios.post(`${BACKEND_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };
export const loginUser =
  (formData: LoginUser) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      const { data } = await axios.post(`${BACKEND_URL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };
export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/me`);
    console.log(data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error: any) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
export const logout = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    const { data } = await axios.post(`${BACKEND_URL}/logout`);
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
