import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Product } from "./ProductTypes";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="flex-shrink-0 border p-4 rounded-xl"
    >
      <div className="rounded-lg overflow-hidden shadow-md w-full">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-40 object-contain rounded-xl"
        />
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {product.name || "Product Name"}
          </p>
          <div className="flex items-center mb-2">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating name="read-only" value={product.ratings} readOnly />
            </Box>
            <span className="text-gray-500 ml-2">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <span className="text-lg font-semibold">${product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
