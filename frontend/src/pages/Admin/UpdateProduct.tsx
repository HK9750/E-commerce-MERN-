import { ThunkDispatch } from "redux-thunk";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "@/constants/productConstants";
import Sidebar from "./Sidebar";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "@/actions/products";
import { useParams } from "react-router-dom";
import { Action } from "@reduxjs/toolkit";

const UpdateProduct = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const categories = [
    "Select a category",
    "Laptop",
    "Electronics",
    "Wearable Tech",
    "Audio",
    "Gaming",
    "Photography",
    "Drinks",
  ];

  const { loading, isUpdated, error } = useSelector(
    (state: any) => state.delupdateproduct
  );

  const { product, error: updateError } = useSelector(
    (state: any) => state.productDetails
  );

  const productId = useParams<{ id: any }>().id;

  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };
  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };
  const handleCategory = (e: any) => {
    setCategory(e.target.value);
  };
  const handleStock = (e: any) => {
    setStock(e.target.value);
  };

  useEffect(() => {
    dispatch(getProductDetails(productId));

    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Product Updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, isUpdated, error, updateError, productId]);

  const updateProductSubmitHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", String(stock));
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateProduct(productId, formData));
  };

  const createProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const result = reader.result;
          if (typeof result === "string") {
            const base64String = result.split(",")[1];
            setImagesPreview((oldArray: string[]) => [...oldArray, result]);
            setImages((oldArray: string[]) => [...oldArray, base64String]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <section className="flex dark:bg-black dark:text-white">
      <Sidebar />
      <div className="w-full lg:w-2/3 xl:w-1/2 p-6 mx-auto my-4 bg-white rounded-lg shadow-md dark:bg-transparent">
        <form
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
          className="space-y-6"
        >
          <h1 className="text-2xl font-bold text-center">Update Product</h1>

          <div className="flex items-center space-x-3">
            <SpellcheckIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={handleName}
              className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-3">
            <AttachMoneyIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <input
              type="number"
              placeholder="Price"
              value={price}
              required
              onChange={handlePrice}
              className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-3">
            <DescriptionIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={handleDescription}
              cols={30}
              rows={5}
              className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <div className="flex items-center space-x-3">
            <AccountTreeIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <select
              onChange={handleCategory}
              className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <StorageIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <input
              type="number"
              placeholder="Stock"
              required
              onChange={handleStock}
              className="flex-1 py-1 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
              className="border border-gray-300 p-2 rounded-md dark:border-gray-600"
            />
          </div>
          <div className="flex space-x-2">
            {imagesPreview.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product Preview"
                className="w-24 h-24 object-cover rounded-md"
              />
            ))}
          </div>
          <button
            disabled={loading ? true : false}
            type="submit"
            className="bg-black hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};
export default UpdateProduct;
