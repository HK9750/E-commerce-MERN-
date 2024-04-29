import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllOrders, clearErrors, deleteOrder } from "@/actions/orderAction";
import { DELETE_ORDER_RESET } from "@/constants/orderConstants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const AllOrders = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { orders, error, isDeleted } = useSelector(
    (state: any) => state.adminOrder
  );
  const { user } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(getAllOrders());
    if (error) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Order is deleted successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted]);

  const deleteOrderHandler = (id: string) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 150,
      renderCell: (params: any) => {
        return (
          <div>
            <p>{params.row.user && params.row.user.name}</p>
            <p>{params.row.user && params.row.user.email}</p>
          </div>
        );
      },
    },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: any) => {
        const id = params.row.id;
        return (
          <>
            <Link to={`/admin/order/${id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteOrderHandler(id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  console.log(orders[0]);
  const rows = orders?.map((order: any) => {
    return {
      id: order._id,
      user: user && user._id === order.user._id ? user.name : order.user,
      amount: order.totalPrice,
      status: order.orderStatus,
    };
  });
  return (
    <section className="bg-white dark:bg-black h-screen flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            All Orders
          </h1>
        </div>
        <div className="bg-white dark:bg-black rounded-lg shadow-md w-[90%]">
          <DataGrid
            className="w-full p-2 gap-8"
            rows={rows}
            columns={columns}
          />
        </div>
      </div>
    </section>
  );
};
export default AllOrders;
