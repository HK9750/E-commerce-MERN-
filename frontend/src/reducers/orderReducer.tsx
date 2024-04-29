import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  UPDATE_ORDER_REQUEST,
  DELETE_ORDER_REQUEST,
  ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_FAIL,
  ALL_ORDERS_FAIL,
} from "@/constants/orderConstants";
import { CLEAR_ERRORS } from "@/constants/productConstants";

interface OrderState {
  loading: boolean;
  order?: any; // Define the type of order object according to your application's structure
  success?: boolean;
  error?: any; // Define the type of error object according to your application's structure
  orders?: any; // Define the type of orders array according to your application's structure
  isUpdated?: boolean;
  isDeleted?: boolean;
}

interface Action {
  type: string;
  payload?: any; // Define the type of payload according to your application's structure
}

const initialState: OrderState = {
  loading: false,
  order: [],
  orders: [],
  error: null,
  isUpdated: false,
  isDeleted: false,
  success: false,
};

export const createOrder = (
  state: OrderState = initialState,
  action: Action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
        success: action.payload.success,
      };
    case CREATE_ORDER_FAIL:
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

export const myOrder = (state: OrderState = initialState, action: Action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case MY_ORDERS_FAIL:
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
export const OrderDetails = (
  state: OrderState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
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

export const adminOrdersReducer = (
  state: OrderState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        order: action.payload.order,
        success: action.payload.success,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        success: action.payload.success,
      };
    case UPDATE_ORDER_RESET:
    case DELETE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
        isDeleted: false,
      };
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
    case ALL_ORDERS_FAIL:
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
