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
