import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import { RemoveItemsFromCart, addItemToCart } from "@/actions/cartAction";

const Cart = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();

  const deleteCartItems = (id: string) => {
    dispatch(RemoveItemsFromCart(id));
  };

  const decreaseQuantity = (id: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(addItemToCart(id, quantity - 1));
    }
  };

  const increaseQuantity = (id: string, quantity: number, stock: number) => {
    if (quantity < stock) {
      dispatch(addItemToCart(id, quantity + 1));
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <RemoveShoppingCartIcon className="text-2xl mb-4" />
          <Typography>No Products in Your Cart</Typography>{" "}
          <Link to="/products" className="text-blue-800 text-lg">
            View Products
          </Link>
        </div>
      ) : (
        <section className="h-screen">
          <h1 className="text-center text-3xl mt-6 font-semibold">Cart</h1>
          <div className="mt-10 rounded-xl gap-10">
            {cartItems.map((item: any) => (
              <div
                key={item.product}
                className="flex justify-evenly w-full border border-gray-100 gap-16 rounded p-4"
              >
                <CartItemCard item={item} deleteItem={deleteCartItems} />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                    className="text-black bg-white border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 focus:outline-none"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        addItemToCart(item.product, Number(e.target.value))
                      )
                    }
                    className="w-16 border border-gray-300 rounded px-2 py-1 focus:outline-none text-center"
                  />
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                    className="text-black bg-white border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 focus:outline-none"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center">
                  <p className="text-black">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              </div>
            ))}

            <div className="w-full flex flex-col overflow-auto justify-center items-center border p-4">
              <div className="p-2">
                <p className="text-xl font-semibold">Gross Total</p>
                <p className="text-center text-lg text-gray-700">{`$${cartItems.reduce(
                  (acc: any, item: any) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div className="my-1">
                <Link
                  to="/shipping"
                  className="bg-black p-2 rounded-[5%] text-white font-semibold"
                >
                  Check Out
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
