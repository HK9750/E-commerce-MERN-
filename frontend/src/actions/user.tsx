import axios from "axios";
import { Dispatch } from "redux";
import { LoginUser } from "@/pages/Auth/AuthTypes";
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
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  ADMIN_USERS_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USER_FAIL,
  ADMIN_USER_SUCCESS,
  ADMIN_USER_REQUEST,
  UPDATE_USER_ROLE_FAIL,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "@/constants/userConstants";
import { BACKEND_URL, CLEAR_ERRORS } from "@/constants/productConstants";

export const registerUser = (formData: any) => async (dispatch: Dispatch) => {
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
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    sessionStorage.setItem("user", JSON.stringify(data.user));
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
    sessionStorage.removeItem("user");
  } catch (error: any) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const updateProfile = (formData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put(`${BACKEND_URL}/me/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const updatePassword = (formData: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.put(`${BACKEND_URL}/updatePass`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const forgotPassword = (email: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post(
      `${BACKEND_URL}/password/forgot`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const resetPassword =
  (formData: any, token: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const { data } = await axios.put(
        `${BACKEND_URL}/password/reset/${token}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const clearErrors = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Admin Actions

export const getAllUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_USERS_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/admin/users`);
    dispatch({ type: ADMIN_USERS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ADMIN_USERS_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const getSingleUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/admin/user/${id}`);
    dispatch({ type: ADMIN_USER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ADMIN_USER_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const updateUserRole =
  (id: string, formData: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_ROLE_REQUEST });
      const { data } = await axios.put(
        `${BACKEND_URL}/admin/user/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_ROLE_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(`${BACKEND_URL}/admin/user/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.message,
    });
  }
};
