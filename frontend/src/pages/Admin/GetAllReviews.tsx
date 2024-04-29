import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { getAllReviews, deleteReview } from "@/actions/products";
import { DELETE_REVIEW_RESET } from "@/constants/productConstants";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";

const GetAllReviews = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { error, reviews } = useSelector((state: any) => state.allReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state: any) => state.createReview
  );

  const [productId, setProductId] = useState("");

  const handleProductId = (e: any) => setProductId(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const deleteReviewHandler = (id: string) => {
    dispatch(deleteReview(id, productId));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 300,
    },
    {
      field: "user",
      headerName: "User",
      width: 150,
      renderCell: (params: any) => {
        return (
          <Link to={`/admin/user/${params.row.user}`}>
            {params.row.user.name}
          </Link>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => {
        return (
          <>
            <DeleteIcon onClick={() => deleteReviewHandler(params.row.id)} />
          </>
        );
      },
    },
  ];

  const rows: any = reviews?.map((review: any) => {
    return {
      id: review._id,
      rating: review.rating,
      comment: review.comment,
      user: review.name,
    };
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (deleteError) {
      toast.error(deleteError);
    }

    if (isDeleted) {
      toast.success("Review deleted successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId, toast]);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-3/4 p-4 dark:bg-transparent dark:text-white">
        <h1 className="text-2xl m-4 font-bold text-center">All Reviews</h1>
        <div className="m-10">
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Enter Product ID"
              value={productId}
              onChange={handleProductId}
              className="border rounded px-4 py-2 w-full"
            ></input>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Get Reviews
            </button>
          </form>
          <div>
            <DataGrid
              rows={rows}
              columns={columns}
              className="dark:text-white bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetAllReviews;
