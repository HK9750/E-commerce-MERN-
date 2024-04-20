import {
  ADD_TO_CART,
  SAVE_SHIPPING_INFO,
  REMOVE_ITEM_CART,
} from "@/constants/cartConstants";

interface Image {
  public_id: String;
  url: String;
}

export interface CartItem {
  product: string;
  name: string;
  price: number;
  image: Image;
  stock: number;
  quantity: number;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  phoneNo: string;
}

export interface CartState {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
}

const initialState: CartState = {
  cartItems: [],
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  },
};

export const cartReducer = (
  state: CartState = initialState,
  action: any
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExists = state.cartItems.find(
        (i: any) => i.product === item.product
      );
      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i: any) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item: CartItem) => item.product !== action.payload
        ),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
