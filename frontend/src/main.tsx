import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import store from "@/store.tsx";
import Home from "./pages/Home/Home.tsx";
import ProductDetails from "./pages/Product/ProductDetails.tsx";
import Product from "./pages/Product/Product.tsx";
import Login from "@/pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import UserRoute from "./pages/Route/UserRoute.tsx";
import Profile from "./pages/Profile/Profile.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:keyword" element={<Product />} />
        <Route path="/" element={<UserRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
