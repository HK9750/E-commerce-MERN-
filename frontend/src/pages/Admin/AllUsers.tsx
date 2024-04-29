import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "@/actions/user";
import { DELETE_USER_RESET } from "@/constants/userConstants";
import { DataGrid } from "@mui/x-data-grid";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AllUsers = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { error, users } = useSelector((state: any) => state.adminUsers);

  const { error: deleteError, isDeleted } = useSelector(
    (state: any) => state.adminUsers
  );

  const deleteUserHandler = (id: string) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User deleted successfully");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns: any = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params: any) => {
        const role = params.row.role;
        return role === "admin" ? "greenColor" : "redColor";
      },
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
            <Link to={`/admin/user/${id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteUserHandler(id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  users &&
    users.forEach((item: any) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.username,
      });
    });

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full max-w-4xl mx-auto my-8 px-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            ALL USERS
          </h1>
          <div className="bg-white dark:bg-transparent rounded-lg shadow-md p-4">
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              className="dark:bg-transparent dark:text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
