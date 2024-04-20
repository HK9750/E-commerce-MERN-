import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "../../components/theme-provider";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyword = (e: any) => {
    setKeyword(e.target.value);
  };
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const searchProduct = (e: any) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <header className="border-b-1 border-gray-900 shadow-md dark:text-white py-2 flex items-center">
      <div className="flex items-center justify-between w-full">
        {/* First div at the very left */}
        <div className="flex items-center">
          <h1 className="xl:text-4xl lg:text-3xl sm:text-2xl ml-8 font-bold italic dark:text-white hover:opacity-85 transform transition-transform duration-500 hover:scale-110">
            Evo
          </h1>
        </div>

        {/* Second div at the middle */}
        <div className="flex-grow hidden lg:flex text-[19px] leading-normal justify-center w-1/3 gap-10 ml-7 font-medium dark:text-white">
          <a href="/" className="hover:opacity-85">
            Home
          </a>
          <a href="/products" className="hover:opacity-85">
            Products
          </a>
          <a href="#" className="hover:opacity-85">
            About
          </a>
          <a href="#" className="hover:opacity-85">
            Contact
          </a>
        </div>

        {/* Third div at the right */}
        <div className="flex items-center justify-between mr-8">
          {location.pathname === "/products" ||
          location.pathname.startsWith("/products/") ? (
            <form
              className="flex justify-center gap-4"
              onSubmit={searchProduct}
            >
              <Input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={handleKeyword}
              />
              <Button type="submit">Search</Button>
            </form>
          ) : null}

          <Button
            variant={"ghost"}
            onClick={handleTheme}
            className="dark:text-white"
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Shopping Cart"
            className="dark:text-white"
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
