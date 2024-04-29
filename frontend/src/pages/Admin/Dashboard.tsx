import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { getAdminProducts } from "@/actions/products";
import { getAllOrders } from "@/actions/orderAction";
import { getAllUsers } from "@/actions/user";
import "chart.js/auto";

const Dashboard = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const { products } = useSelector((state: any) => state.products);
  const { orders } = useSelector((state: any) => state.adminOrder);
  const { users } = useSelector((state: any) => state.adminUsers);

  let outOfStock = 0;
  products.forEach((product: any) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((order: any) => {
      totalAmount += order.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["rgb(0, 106, 246)", "#6800B4"],
        hoverBackgroundColor: ["#0e6eae", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <section className="flex border dark:bg-transparent dark:text-white">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-4xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          Dashboard
        </h1>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 mb-8">
            <Line
              data={lineState}
              options={{ maintainAspectRatio: false }}
              height={200}
            />
          </div>

          <div className="w-full md:w-1/2 mb-8">
            <Doughnut
              data={doughnutState}
              options={{ maintainAspectRatio: false }}
              height={200}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-transparent dark:text-white border dark:border-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-bold mb-2">Total Amount</p>
            <p className="text-xl">${totalAmount}</p>
          </div>
          <Link to="/admin/products" className="dashboard-link">
            <div className="bg-white p-4 rounded-lg shadow-md dark:bg-transparent dark:text-white border dark:border-white">
              <p className="text-lg font-bold mb-2">Products</p>
              <p>{products && products.length}</p>
            </div>
          </Link>
          <Link to="/admin/orders" className="dashboard-link">
            <div className="bg-white p-4 rounded-lg shadow-md dark:bg-transparent dark:text-white border dark:border-white">
              <p className="text-lg font-bold mb-2">Orders</p>
              <p>{orders && orders.length}</p>
            </div>
          </Link>
          <Link to="/admin/users" className="dashboard-link">
            <div className="bg-white p-4 rounded-lg shadow-md dark:bg-transparent dark:text-white border dark:border-white">
              <p className="text-lg font-bold mb-2">Users</p>
              <p>{users && users.length}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
