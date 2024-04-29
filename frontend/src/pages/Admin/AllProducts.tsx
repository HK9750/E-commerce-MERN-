import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "@/actions/products";
import Sidebar from "./Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_PRODUCT_RESET } from "@/constants/productConstants";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllProducts = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const { products } = useSelector((state: any) => state.products);
  const { error, isDeleted } = useSelector(
    (state: any) => state.delupdateproduct
  );
  console.log(products);

  const deleteProductHandler = (id: any) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Product deleted successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, isDeleted]);

  const columns: any = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params: any) => {
        const id = params.row.id;
        return (
          <>
            <Link to={`/admin/product/${id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];
  products &&
    products.forEach((item: any) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <section className="flex dark:bg-transparent">
      <Sidebar />
      <div className="flex flex-col w-full max-w-4xl mx-auto my-8 px-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          All Orders
        </h1>
        <div className="bg-white dark:bg-transparent rounded-lg shadow-md flex-1">
          <DataGrid
            className="w-full dark:bg-transparent dark:text-white"
            rows={rows}
            columns={columns}
          />
        </div>
      </div>
    </section>
  );
};
export default AllProducts;
