import Header from "./pages/Home/Header";
import Footer from "./pages/Home/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer position="bottom-right" theme="dark" />
      <Footer />
    </>
  );
}

export default App;
