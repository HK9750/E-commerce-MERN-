import Logo from "@/images/EvoLogo.png";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <section className="bg-gray-100 dark:bg-transparent dark:border-r-2 dark:border-white p-4 h-screen w-[150px]">
      <Link to="/" className="block mb-6">
        <img src={Logo} alt="Ecommerce" className="h-16 object-cover" />
      </Link>
      <Link to="/dashboard" className="block mb-4">
        <p className="flex items-center text-gray-800 dark:text-gray-200">
          <DashboardIcon className="mr-2" /> Dashboard
        </p>
      </Link>
      <div className="mb-4">
        <p className="mb-2 text-gray-800 dark:text-gray-200">Products</p>
        <Link to="/admin/products" className="block mb-2">
          <div className="flex items-center">
            <p className="flex items-center">
              <PostAddIcon className="mr-2" />
              All
            </p>
          </div>
        </Link>
        <Link to="/admin/product" className="block">
          <div className="flex items-center">
            <p className="flex items-center">
              <AddIcon className="mr-2" />
              Create
            </p>
          </div>
        </Link>
      </div>

      <Link to="/admin/orders" className="block mb-4">
        <p className="flex items-center text-gray-800 dark:text-gray-200">
          <ListAltIcon className="mr-2" /> Orders
        </p>
      </Link>
      <Link to="/admin/users" className="block mb-4">
        <p className="flex items-center text-gray-800 dark:text-gray-200">
          <PeopleIcon className="mr-2" /> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className="block mb-4">
        <p className="flex items-center text-gray-800 dark:text-gray-200">
          <RateReviewIcon className="mr-2" /> Reviews
        </p>
      </Link>
    </section>
  );
};
export default Sidebar;
