import Product from "../models/productModel.js";
import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  if (!product) {
    return next(new ErrorHandler("Product has not been created", 404));
  }

  res.status(201).json({
    success: true,
    product,
  });
});

export const getAllProducts = AsyncErrorHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  const products = await apiFeatures.query;

  if (!products) {
    return next(new ErrorHandler("Error fetching all the products", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

export const getProductDetails = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product details not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found for update", 404));
  }

  const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    newProduct,
  });
});

export const deleteProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found for deletion", 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product has been successfully deleted.",
  });
});
