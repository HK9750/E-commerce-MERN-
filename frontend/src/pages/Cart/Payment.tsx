import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useRef } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { ThunkDispatch } from "redux-thunk";
import { toast } from "react-toastify";
import { BACKEND_URL } from "@/constants/productConstants";
import axios from "axios";
import { createOrder } from "@/actions/orderAction";
import { useNavigate } from "react-router-dom";

interface CartItem {
  product: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  countInStock: number;
}

interface ShippingInfo {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Order {
  orderItems: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: any;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") || "{}");
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state: any) => state.cart);

  const paymentAmount: { amount: number } = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order: Order = {
    orderItems: cartItems,
    shippingInfo: shippingInfo,
    paymentInfo: {},
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        console.log("Stripe or Elements not loaded");
        return;
      }
      const { data } = await axios.post(
        `${BACKEND_URL}/payment/process`,
        paymentAmount,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.client_secret) {
        order.paymentInfo = {
          id: data.client_secret,
          status: "succeeded",
        };
        dispatch(createOrder(order));
        toast.success("Payment Successful");
        navigate("/success");
      } else {
        toast.error("Payment Failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="my-8">
      <CheckOutSteps activeStep={2} />
      <div className="p-4 border shadow-md h-[65vh] w-[30%] mx-auto rounded-xl">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-3xl font-bold mb-4 text-center text-red-400 border-b-2 border-red-400 p-2 rounded-lg shadow-lg">
            Card Info
          </h1>
          <div className="mb-4 flex items-center border border-gray-300 rounded-md p-2">
            <CreditCardIcon className="mr-2 w-6 h-6" />
            <CardNumberElement className="w-full focus:outline-none" />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded-md p-2">
            <EventIcon className="mr-2 w-6 h-6" />
            <CardExpiryElement className="w-full focus:outline-none" />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded-md p-2">
            <VpnKeyIcon className="mr-2 w-6 h-6" />
            <CardCvcElement className="w-full focus:outline-none" />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="submit"
              value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="bg-red-400 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow-md cursor-pointer"
            />
          </div>
        </form>
      </div>
    </section>
  );
};
export default Payment;
