import { getAllReviews, getProductDetails } from "@/actions/products";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useParams } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import classnames from "classnames";
import profile from "@/images/download.png";
import { Review } from "./ProductTypes";
import { createAndUpdateReview } from "@/actions/products";
import DialogReview from "./DialogReview";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "../Home/Loading";
import { toast } from "react-toastify";
import { CREATE_REVIEW_RESET } from "@/constants/productConstants";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { reviews } = useSelector((state: any) => state.allReviews);
  console.log(reviews);
  const { product, loading, error } = useSelector(
    (state: any) => state.productDetails
  );

  const { success, error: ReviewError } = useSelector(
    (state: any) => state.createReview
  );

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCartHandler = () => {
    console.log("Added to cart");
  };

  const submitReview = () => {
    if (id && typeof rating === "number") {
      dispatch(createAndUpdateReview({ rating, comment, productId: id }));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
      dispatch(getAllReviews(id));
    }
    if (error) {
      toast.error("Error fetching product details");
    }
    if (success) {
      toast.success("New review has been created");
      dispatch({ type: CREATE_REVIEW_RESET });
    }
    if (ReviewError) {
      toast.error("Error creating new Review");
    }
  }, [dispatch, id, error, success, ReviewError]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-[85%] mx-auto m-12">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-transparent rounded-lg border-gray-300 overflow-hidden">
              <div className="h-full flex items-center justify-center border-b-2 border-gray-700">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full max-w-xs"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {product &&
                      product.images &&
                      product.images.map((img: { url: string }, i: number) => (
                        <CarouselItem key={i}>
                          <div className="p-1 ml-8">
                            <Card>
                              <CardContent className="flex aspect-square items-start justify-center pt-4">
                                <img
                                  src={img.url}
                                  className="object-cover h-full"
                                  alt="SOMETHING"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="text-black dark:text-white border-l-2 border-t-2 px-6 py-3 border-gray-700 flex flex-col justify-center">
                <div>
                  <h1 className="text-3xl font-semibold">{product.name}</h1>
                  <h1 className="font-semibold text-lg py-2">
                    Product-Id :
                    <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg">
                      {product._id}
                    </span>
                  </h1>
                </div>
                <div>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating name="read-only" value={product.ratings} />
                  </Box>
                  <h1 className="text-lg font-semibold">
                    Number of Reviews :{" "}
                    <span className="inline-block text-gray-700 dark:text-gray-300">
                      {product.numOfReviews}
                    </span>
                  </h1>
                </div>
                <div>
                  <h1 className="py-1 text-xl font-semibold">
                    Price :
                    <span className="inline-block text-gray-700 dark:text-gray-300">
                      {product.price}
                    </span>
                  </h1>
                  <div className="flex items-center space-x-4 dark:text-white">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 py-1 bg-black text-white font-semibold text-lg focus:outline-none dark:bg-white dark:text-black"
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      className="w-10 py-1 text-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:outline-none"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="px-3 py-1 bg-black text-white font-semibold text-lg focus:outline-none dark:bg-white dark:text-black"
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className="dark:bg-white dark:text-black bg-black rounded-lg text-white px-4 py-2 text-md font-semibold  mt-4 focus:outline-none w-full"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="py-3">
                  <p className="text-lg font-bold">
                    Status :{" "}
                    <b
                      className={classnames("text-green-500", {
                        "text-red-500": product.stock > 1,
                      })}
                    >
                      {product.Stock <= 1 ? "Out of Stock" : "In Stock"}
                    </b>
                  </p>

                  <div className="font-semibold text-lg">
                    Description :{" "}
                    <p className="font-medium">{product.description}</p>
                  </div>
                  <button
                    onClick={() => setOpenDialog(true)}
                    className="text-white bg-black font-semibold py-2 px-4 focus:outline-none my-2 rounded-lg dark:bg-white dark:text-black"
                  >
                    Submit Review
                  </button>
                  <DialogReview
                    setOpenDialog={setOpenDialog}
                    openDialog={openDialog}
                    submitReview={submitReview}
                    rating={rating ?? 0}
                    comment={comment}
                    setRating={setRating}
                    setComment={setComment}
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="m-10 text-center text-4xl font-bold text-gray-900 dark:text-white">
                Reviews Section
              </h1>

              {reviews &&
                reviews[0] &&
                reviews.map((review: Review) => (
                  <div
                    key={review._id}
                    className="bg-gray-200 dark:bg-gray-800 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 text-gray-800 dark:text-white rounded-xl mx-auto mb-4"
                  >
                    <div className="flex px-2 gap-4 items-center justify-center">
                      <img
                        src={profile}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover shadow-md mb-3"
                      />
                      <span className="text-md font-semibold">
                        {review.name.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                      >
                        <Rating name="read-only" value={review.rating} />
                      </Box>
                    </div>
                    <h3 className="text-center p-1">{review.comment}</h3>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetails;
