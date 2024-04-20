import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: any) => state.user);
  const subtotal = cartItems.reduce(
    (acc: any, item: any) => acc + item.quantity * item.price,
    0
  );

  const shippingPrice = subtotal > 1000 ? 0 : 200;

  const taxPrice = subtotal * 0.18;

  const totalPrice = subtotal + taxPrice + shippingPrice;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
  };

  return (
    <section className="my-8">
      <CheckOutSteps activeStep={1} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold my-4 text-center text-gray-900 border-b-4 border-gray-700 pb-2">
          Confirm Order
        </h1>
        <div className="w-96 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold text-center py-2">
              Shipping Information
            </h2>
            <p className="text-gray-700 py-2">
              <strong>Address:</strong> {address}
            </p>
            <p className="text-gray-700 py-2">
              <strong>Phone:</strong> {shippingInfo.phone}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Order Items</h2>
            {cartItems.map((item: any) => (
              <div key={item.product} className="flex gap-4 my-4 items-center">
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="w-12 h-12 object-cover"
                />
                <Link
                  to={`/products/${item.product}`}
                  className="text-blue-800"
                >
                  {item.name}
                </Link>
                <p className="text-gray-700">
                  {item.quantity} x ${item.price} = $
                  {item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p className="text-gray-700">
              <strong>Items:</strong> ${subtotal}
            </p>
            <p className="text-gray-700">
              <strong>Shipping:</strong> ${shippingPrice}
            </p>
            <p className="text-gray-700">
              <strong>Tax:</strong> ${taxPrice}
            </p>
            <p className="text-gray-700">
              <strong>Total:</strong> ${totalPrice}
            </p>
          </div>
          <Link
            to="/payment"
            className="bg-black text-white p-2 rounded-[5%] text-center font-semibold hover:opacity-95"
            onClick={proceedToPayment}
          >
            Confirm Order
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ConfirmOrder;
