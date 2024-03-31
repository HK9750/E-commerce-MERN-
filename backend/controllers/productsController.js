import Product from "../models/productModel.js";
import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/ApiFeatures.js";

export const createProduct = AsyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id;
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
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const filteredProductsCount = await apiFeature.getFilteredProductsCount();

  apiFeature.pagination(resultPerPage);
  let products = await apiFeature.query;

  if (!products) {
    return next(new ErrorHandler("Error fetching all the products", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productsCount,
    filteredProductsCount,
    resultPerPage,
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

export const createProductReview = AsyncErrorHandler(async (req, res, next) => {
  const { comment, rating, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.username,
    comment,
    rating: Number(rating),
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: true });
  res.status(200).json({
    success: true,
  });
});

export const getAllReviews = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Invalid id,Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const deleteProductReview = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found for review deletion", 404));
  }
  const reviews = product.reviews.filter((rev) => {
    rev._id.toString() !== req.query.id.toString();
  });

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, noOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
