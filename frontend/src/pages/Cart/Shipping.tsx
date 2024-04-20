import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { saveShippingInfo } from "@/actions/cartAction";
import { useState } from "react";
import { TextField } from "@mui/material";
import CheckoutSteps from "./CheckOutSteps";

const Shipping = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { shippingInfo } = useSelector((state: any) => state.cart);

  const [phoneNo, setphoneNo] = useState(shippingInfo.phoneNo || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [pinCode, setpinCode] = useState(shippingInfo.pinCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "");

  const handlephoneNo = (e: any) => setphoneNo(e.target.value);
  const handleAddress = (e: any) => setAddress(e.target.value);
  const handleCity = (e: any) => setCity(e.target.value);
  const handleState = (e: any) => setState(e.target.value);
  const handlepinCode = (e: any) => setpinCode(e.target.value);
  const handleCountry = (e: any) => setCountry(e.target.value);

  const saveShipping = () => {
    dispatch(
      saveShippingInfo({ phoneNo, address, city, state, pinCode, country })
    );
  };

  return (
    <section>
      <CheckoutSteps activeStep={0} />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold my-4 text-center text-gray-900 border-b-4 border-gray-700 pb-2">
          Shipping Information
        </h1>

        <div className="w-96 flex flex-col gap-4">
          <div>
            <TextField
              label="phoneNo"
              variant="outlined"
              fullWidth
              value={phoneNo}
              onChange={handlephoneNo}
              className="mb-4"
            />
          </div>
          <div>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={address}
              onChange={handleAddress}
              className="mb-4"
            />
          </div>
          <div>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              onChange={handleCity}
              className="mb-4"
            />
          </div>
          <div>
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              value={state}
              onChange={handleState}
              className="mb-4"
            />
          </div>
          <div>
            <TextField
              label="PinCode"
              variant="outlined"
              fullWidth
              value={pinCode}
              onChange={handlepinCode}
              className="mb-4"
            />
          </div>
          <div>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              value={country}
              onChange={handleCountry}
              className="mb-4"
            />
          </div>
          <Link
            onClick={saveShipping}
            to="/confirmorder"
            className="bg-black text-white p-2 rounded-[5%] text-center font-semibold hover:opacity-95"
          >
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
