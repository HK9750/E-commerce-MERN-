import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { toast } from "react-toastify";
import { Action } from "@reduxjs/toolkit";
import Loading from "../Home/Loading";
import { useNavigate } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "@/actions/orderAction";
import { Typography } from "@mui/material";

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { loading, error, order } = useSelector((state: any) => state.myorder);
  const { user } = useSelector((state: any) => state.user);
  const columns: any = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params: any) => {
        const orderId = params.row.id;
        return (
          <Link to={`/order/${orderId}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows: any = [];

  order &&
    order.forEach((item: any, index: any) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getMyOrders());
  }, [error, dispatch, toast]);
  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 m-12">
          <Typography variant="h6" className="mb-4 text-center">
            {user.username}'s Orders
          </Typography>
          <div className="overflow-x-auto">
            <DataGrid rows={rows} columns={columns} autoHeight />
          </div>
        </div>
      )}
    </section>
  );
};
export default MyOrders;
