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
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  LOGIN_USER_RESET,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAIL,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  ADMIN_USER_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
  UPDATE_USER_ROLE_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
} from "@/constants/userConstants";
import { CLEAR_ERRORS } from "@/constants/productConstants";

export interface UserState {
  loading: boolean;
  user: RegisterUser;
  users?: RegisterUser[];
  isAuthenticated: boolean;
  success: boolean;
  error: any;
  isUpdated: boolean;
  isDeleted?: boolean;
}
const initialState: UserState = {
  loading: false,
  isAuthenticated: false,
  success: false,
  user: {} as RegisterUser,
  users: [],
  error: null,
  isUpdated: false,
  isDeleted: false,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        success: action.payload.success,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGIN_USER_RESET:
      return {
        ...state,
        success: false,
        isAuthenticated: false,
      };
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
    case LOAD_USER_FAIL:
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

export const logoutReducer = (state: UserState = initialState, action: any) => {
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

export const updateUserReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        success: action.payload.success,
        user: action.payload.user,
      };
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
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

export const updatePassReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        success: action.payload.success,
        user: action.payload.user,
      };
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
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

export const forgetPassReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        success: false,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
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

export const adminUsersReducer = (
  state: UserState = initialState,
  action: any
) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
    case ADMIN_USER_REQUEST:
    case UPDATE_USER_ROLE_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        success: action.payload.success,
      };
    case ADMIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        user: action.payload.user,
        isUpdated: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        isDeleted: true,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_USER_ROLE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ADMIN_USERS_FAIL:
    case ADMIN_USER_FAIL:
    case UPDATE_USER_ROLE_FAIL:
    case DELETE_USER_FAIL:
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
