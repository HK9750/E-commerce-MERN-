import { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileImg from "@/images/download.png";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { logout } from "@/actions/user";
import { useDispatch } from "react-redux";

const UserOptions = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const { success } = useSelector((state: any) => state.logout);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/profile");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    if (success) {
      navigate("/login");
    }
  }

  return (
    <section>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="fixed top-28 right-12 w-12"
        icon={
          <img
            className="rounded-full w-14 h-14 object-cover"
            src={user.avatar && user.avatar.url ? user.avatar.url : ProfileImg}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </section>
  );
};

export default UserOptions;
