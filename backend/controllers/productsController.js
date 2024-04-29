import Product from "../models/productModel.js";
import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import cloudinary from "cloudinary";

export const createProduct = AsyncErrorHandler(async (req, res, next) => {
  let images = [];

  const stock = req.body.stock;
  req.body.stock = parseInt(stock);

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${images[i]}`,
      {
        folder: "products",
        height: 400,
        width: 400,
      }
    );

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
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
    .filter()
    .pagination(resultPerPage);
  const filteredProductsCount = await apiFeature.getFilteredProductsCount();
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

  let stock = req.body.stock;
  req.body.stock = parseInt(stock);

  if (!product) {
    return next(new ErrorHandler("Product not found for update", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else if (Array.isArray(req.body.images)) {
    images = req.body.images;
  } else {
    return next(new ErrorHandler("Invalid format for images", 400));
  }

  if (product.images.length > 0) {
    for (let i = 0; i < product.images.length; i++) {
      try {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    try {
      const result = await cloudinary.v2.uploader.upload(
        `data:image/jpeg;base64,${images[i]}`,
        {
          folder: "products",
          height: 400,
          width: 400,
        }
      );
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return next(new ErrorHandler("Failed to upload image", 500));
    }
  }

  req.body.images = imagesLinks;

  try {
    const newProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: true,
      }
    );

    res.status(200).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return next(new ErrorHandler("Failed to update product", 500));
  }
});

export const deleteProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found for deletion", 404));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
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
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
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

export const adminProducts = AsyncErrorHandler(async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler("Error fetching admin products", 500));
  }
});
