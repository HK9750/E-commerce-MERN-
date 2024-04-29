import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Home/Loading";
import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getOrderDetails } from "@/actions/orderAction";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { loading, error, order } = useSelector(
    (state: any) => state.orderDetails
  );
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getOrderDetails(id));
  }, [error, id, dispatch]);
  return loading ? (
    <Loading />
  ) : (
    <section className="dark:bg-black bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Order: #{order && order._id}
        </h1>
        <h1 className="text-xl font-semibold mb-4">Shipping Info</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">Name:</p>
            <span className="text-gray-800 dark:text-gray-100">
              {order.user && order.user.username}
            </span>
          </div>
          <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">Phone:</p>
            <span className="text-gray-800 dark:text-gray-100">
              {order.shippingInfo && order.shippingInfo.phoneNo}
            </span>
          </div>
          <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">Address:</p>
            <span className="text-gray-800 dark:text-gray-100">
              {order.shippingInfo &&
                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
            </span>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-4">Payment Info</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md">
            <p
              className={`text-lg font-semibold ${
                order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.paymentInfo && order.paymentInfo.status === "succeeded"
                ? "PAID"
                : "NOT PAID"}
            </p>
          </div>
          <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">Amount:</p>
            <span className="text-gray-800 dark:text-gray-100">
              {order.totalPrice && order.totalPrice}
            </span>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-4">Order Status</h1>
        <div className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-md mb-6">
          <p
            className={`text-lg font-semibold ${
              order.orderStatus && order.orderStatus === "Delivered"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {order.orderStatus && order.orderStatus === "Delivered"
              ? "Delivered"
              : "Not Delivered"}
          </p>
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-4">Order Items:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {order.orderItems &&
              order.orderItems.map((item: any) => (
                <div
                  key={item.product}
                  className="dark:bg-gray-800 bg-white p-4 rounded-lg shadow-md flex justify-center flex-col items-center"
                >
                  <img
                    src={item.image.url}
                    alt="Product"
                    className="w-24 h-auto mb-4 object-cover"
                  />
                  <a
                    href={`/product/${item.product}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {item.name}
                  </a>{" "}
                  <p className="text-gray-800 dark:text-gray-100">
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default OrderDetails;
