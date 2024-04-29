import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createOrder = AsyncErrorHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
export const getSingleOrder = AsyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "username email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not find with id:${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    order,
  });
});
export const getUserOrders = AsyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

export const getAllOrders = AsyncErrorHandler(async (req, res, next) => {
  try {
    const orders = await Order.find();
    let totalBill = 0;
    orders.forEach((order) => {
      totalBill += order.totalPrice;
    });
    res.status(200).json({
      success: true,
      orders,
      totalBill,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler("Error fetching admin orders", 500));
  }
});

const setStock = async (id, quantity) => {
  const product = await Product.findById(req.params.id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: true });
};
export const updateOrder = AsyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id:${req.params.id}`, 404)
    );
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has already been delivered", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await setStock(o.product, o.quantity);
    });
  }
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  order.orderStatus = req.body.status;
  console.log(order.orderStatus);

  await order.save({ validateBeforeSave: true });

  res.status(200).json({
    success: true,
    order,
  });
});

export const deleteOrder = AsyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with the id:${req.params.id}`)
    );
  }
  await Order.findByIdAndDelete(req.params.id, order);
  res.status(200).json({
    success: true,
    message: "Order deleted Successfully",
  });
});
