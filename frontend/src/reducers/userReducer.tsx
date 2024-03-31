import { RegisterUser } from "@/pages/Auth/AuthTypes";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
} from "@/constants/userConstants";

export interface UserState {
  loading: boolean;
  user: RegisterUser;
  isAuthenticated: boolean;
  success: boolean;
  error: any;
}
const initialState: UserState = {
  loading: false,
  isAuthenticated: false,
  success: false,
  user: {} as RegisterUser,
  error: null,
};

export const registerUserReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        success: action.payload.success,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const loginUserReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        success: action.payload.success,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const loadUserReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const logoutUserReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        success: action.payload.success,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
