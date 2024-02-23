import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of product"],
  },
  description: {
    type: String,
    required: [true, "Please enter description of product"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price of product"],
    maxLength: [7, "Price cannot exceed 7 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, "Please enter public_id of image"],
      },
      url: {
        type: String,
        required: [true, "Please enter url of image"],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter a category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter stock of product"],
    default: 1,
    maxLength: [4, "stock do not exceed 4 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
