import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from "@/constants/orderConstants";

interface OrderState {
  loading: boolean;
  order?: any; // Define the type of order object according to your application's structure
  success?: boolean;
  error?: any; // Define the type of error object according to your application's structure
}

interface Action {
  type: string;
  payload?: any; // Define the type of payload according to your application's structure
}

const initialState: OrderState = {
  loading: false,
  order: [],
};

export const createOrder = (
  state: OrderState = initialState,
  action: Action
): OrderState => {
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
    default:
      return state;
  }
};
