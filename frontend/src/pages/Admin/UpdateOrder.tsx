import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import {
  updateOrder,
  getOrderDetails,
  clearErrors,
} from "@/actions/orderAction";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { UPDATE_ORDER_RESET } from "@/constants/orderConstants";
import Sidebar from "./Sidebar";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const UpdateOrder = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const [status, setStatus] = useState("");
  const { order, error } = useSelector((state: any) => state.orderDetails);
  const { isUpdated } = useSelector((state: any) => state.adminOrder);
  const id = useParams<{ id: any }>().id;
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  const handleUpdateOrder = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    dispatch(updateOrder(id, formData));
  };
  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, isUpdated]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 dark:bg-gray-800 dark:text-white">
        <div className="p-4">
          <Sidebar />
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <div className="p-4">
          <div className="max-w-lg mx-auto">
            <form
              onSubmit={handleUpdateOrder}
              className="bg-white dark:bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h1 className="text-2xl font-bold mb-4">Update Order</h1>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateOrder;
