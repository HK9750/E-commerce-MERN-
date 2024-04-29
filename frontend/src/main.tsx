import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import store from "@/store.tsx";
import Home from "./pages/Home/Home.tsx";
import ProductDetails from "./pages/Product/ProductDetails.tsx";
import Product from "./pages/Product/Product.tsx";
import Login from "@/pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import UserRoute from "./pages/Route/UserRoute.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import UpdateProfile from "./pages/Profile/UpdateProfile.tsx";
import UpdatePassword from "./pages/Profile/UpdatePassword.tsx";
import ForgetPassword from "./pages/Profile/ForgetPassword.tsx";
import ResetPassword from "./pages/Profile/ResetPassword.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Shipping from "./pages/Cart/Shipping.tsx";
import ConfirmOrder from "./pages/Cart/ConfirmOrder.tsx";
import Payment from "./pages/Cart/Payment.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { REACT_APP_STRIPE_API_KEY } from "./config.tsx";
import Success from "./pages/Cart/Success.tsx";
import MyOrders from "./pages/Orders/MyOrders.tsx";
import OrderDetails from "./pages/Orders/OrderDetails.tsx";
import AdminRoute from "./pages/Route/AdminRoute.tsx";
import Dashboard from "./pages/Admin/Dashboard.tsx";
import NewProducts from "./pages/Admin/NewProducts.tsx";
import AllProducts from "./pages/Admin/AllProducts.tsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.tsx";
import AllOrders from "./pages/Admin/AllOrders.tsx";
import UpdateOrder from "./pages/Admin/UpdateOrder.tsx";
import AllUsers from "./pages/Admin/AllUsers.tsx";
import UpdateUserRole from "./pages/Admin/UpdateUserRole.tsx";
import About from "./pages/Home/About.tsx";
import Contact from "./pages/Home/Contact.tsx";
import GetAllReviews from "./pages/Admin/GetAllReviews.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/profile/resetPassword/:token",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: (
          <UserRoute>
            <Profile />
          </UserRoute>
        ),
      },
      {
        path: "/profile/update",
        element: (
          <UserRoute>
            <UpdateProfile />
          </UserRoute>
        ),
      },
      {
        path: "/profile/updatePassword",
        element: (
          <UserRoute>
            <UpdatePassword />
          </UserRoute>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/:keyword",
        element: <Product />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/cart",
        element: (
          <UserRoute>
            <Cart />
          </UserRoute>
        ),
      },
      {
        path: "/shipping",
        element: (
          <UserRoute>
            <Shipping />
          </UserRoute>
        ),
      },
      {
        path: "/confirmorder",
        element: (
          <UserRoute>
            <ConfirmOrder />
          </UserRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <Elements stripe={loadStripe(REACT_APP_STRIPE_API_KEY)}>
            <UserRoute>
              <Payment />
            </UserRoute>
          </Elements>
        ),
      },
      {
        path: "/success",
        element: (
          <UserRoute>
            <Success />
          </UserRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <UserRoute>
            <MyOrders />
          </UserRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <UserRoute>
            <OrderDetails />
          </UserRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/product",
        element: (
          <AdminRoute>
            <NewProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/product/:id",
        element: (
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/order/:id",
        element: (
          <AdminRoute>
            <UpdateOrder />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/user/:id",
        element: (
          <AdminRoute>
            <UpdateUserRole />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/reviews",
        element: (
          <AdminRoute>
            <GetAllReviews />
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
