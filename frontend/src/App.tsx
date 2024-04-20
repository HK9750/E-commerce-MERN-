import Header from "./pages/Home/Header";
import Footer from "./pages/Home/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { loadUser } from "./actions/user";
import UserOptions from "./pages/Home/UserOptions";

function App() {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  useEffect(() => {
    document.title = "Evo E-commerce";
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Header />
      <div>
        <UserOptions />
      </div>
      <main>
        <Outlet />
      </main>
      <ToastContainer position="bottom-right" theme="dark" />
      <Footer />
    </>
  );
}

export default App;
