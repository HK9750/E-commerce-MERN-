import ProductCard from "../Product/ProductCard";
import Loading from "../Home/Loading";
import { ThunkDispatch } from "redux-thunk";
import { useEffect, useState } from "react";
import { getProducts } from "@/actions/products";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Action } from "@reduxjs/toolkit";
import { CLEAR_ERRORS } from "@/constants/productConstants";

const Product = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingsFilter, setRatingsFilter] = useState(0);

  const handleCurrentPage = (page: number) => setCurrentPage(page);
  const handleRatingFilter = (rating: number) => setRatingsFilter(rating);
  const handleCategoryFilter = (e: any) => setCategoryFilter(e.target.value);
  const handleMinPrice = (e: any) => setMinPrice(parseInt(e.target.value, 10));
  const handleMaxPrice = (e: any) => setMaxPrice(parseInt(e.target.value, 10));

  const categories = [
    "Select a category",
    "Laptop",
    "Electronics",
    "Wearable Tech",
    "Audio",
    "Gaming",
    "Photography",
  ];
  const {
    products,
    productsCount,
    filteredProductsCount,
    resultPerPage,
    loading,
    error,
  } = useSelector((state: any) => state.products);
  const { keyword } = useParams<{ keyword: string }>();

  const totalPages = Math.ceil(productsCount / resultPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  };
  const handleNextPage = () => {
    if (totalPages > currentPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching the products");
      dispatch({ type: CLEAR_ERRORS });
    }
    // Check if categoryFilter is empty or matches the default value
    if (!categoryFilter || categoryFilter === "Select a category") {
      dispatch(
        getProducts(
          keyword,
          currentPage,
          minPrice,
          maxPrice,
          "", // Pass an empty string as category
          ratingsFilter
        )
      );
    } else {
      dispatch(
        getProducts(
          keyword,
          currentPage,
          minPrice,
          maxPrice,
          categoryFilter,
          ratingsFilter
        )
      );
    }
  }, [
    dispatch,
    error,
    keyword,
    currentPage,
    productsCount,
    filteredProductsCount,
    minPrice,
    maxPrice,
    categoryFilter,
    ratingsFilter,
  ]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section>
          <div className="flex items-center justify-center my-6">
            <h1 className="font-bold text-3xl">Featured Products</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-2 m-2 justify-between bg-white dark:bg-gray-800 border border-gray-300 rounded-lg">
            {/* Price Range */}
            <div className="">
              <h3 className="text-center font-semibold">Price Range</h3>
              <div className="m-2">
                <label className="font-semibold mr-3">Min-Price :</label>
                <input
                  type="number"
                  name="minPrice"
                  id="minPrice"
                  className="w-24 md:w-32 py-1 px-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={handleMinPrice}
                />
              </div>
              <div className="flex m-2 items-center">
                <label className="font-semibold mr-3">Max-Price :</label>
                <input
                  type="number"
                  name="maxPrice"
                  id="maxPrice"
                  className="w-24 md:w-32 py-1 px-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={handleMaxPrice}
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col items-center">
              <h3 className="font-semibold p-1 text-center">Category</h3>
              <select
                name="category"
                id="category"
                className="w-1/2 bg-gray-100 dark:bg-gray-700 rounded-md p-1 outline-none"
                value={categoryFilter}
                onChange={handleCategoryFilter}
              >
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Ratings */}
            <div className="w-full md:w-1/3">
              <h3 className="font-semibold">Ratings</h3>
              <div className="mt-1">
                <Box>
                  <Rating
                    name="read-only"
                    value={ratingsFilter}
                    precision={1}
                    onChange={(event, newValue) => {
                      handleRatingFilter(newValue || 0);
                    }}
                  />
                </Box>
              </div>
            </div>
          </div>

          <div className="flex items-center mx-auto gap-4">
            <div className="flex items-center justify-center m-4 gap-6 p-4 flex-wrap flex-1">
              {products &&
                products.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
          {filteredProductsCount > resultPerPage && (
            <div className="m-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePrevPage}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                  {pages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage == page}
                        onClick={handleCurrentPage.bind(null, page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Product;
