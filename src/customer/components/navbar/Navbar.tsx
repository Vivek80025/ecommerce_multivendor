import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Storefront } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../Data/category/mainCategory";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../State/Store";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const { auth } = useAppSelector((store) => store);
  const { seller } = useAppSelector((store) => store);
  return (
    <>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              {!isLarge && (
                <IconButton onClick={() => navigate("/")}>
                  <MenuIcon />
                </IconButton>
              )}

              <h1
                onClick={() => navigate("/")}
                className="logo cursor-pointer text-lg md:text-2xl text-primary-color"
              >
                Vivek Bazzar
              </h1>
            </div>

            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  key={item.name}
                  onMouseLeave={() => {
                    setShowCategorySheet(false);
                  }}
                  onMouseEnter={() => {
                    setShowCategorySheet(true);
                    setSelectedCategory(item.categoryId);
                  }}
                  className=" hover:text-primary-color hover:border-b-2 h-[70px] px-4 flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1 lg:gap-6">
            <IconButton onClick={() => navigate("/search-product")}>
              <SearchIcon />
            </IconButton>

            {auth.user ? (
              <Button
                onClick={() =>{
                  (auth.user?.role === "ROLE_ADMIN") ? navigate("/admin") : navigate("/account/orders")
                }}
                className="flex items-center gap-2"
              >
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="https://yt3.ggpht.com/G0p4YlsN2rbHAexFyPEUxqkRBrwrwmF4bS2AzHIgxVDJpGdbpE6vkbR5cPYiv2lzpth7Z5ca=s88-c-k-c0x00ffffff-no-rj"
                />
                <h1 className="font-semibold hidden lg:block">
                  {auth.user?.fullName.split(" ")[0]}
                </h1>
              </Button>
            ) : 
            seller.profile ? (
              <Button
                onClick={() => navigate("/seller")}
                className="flex items-center gap-2"
              >
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="https://yt3.ggpht.com/G0p4YlsN2rbHAexFyPEUxqkRBrwrwmF4bS2AzHIgxVDJpGdbpE6vkbR5cPYiv2lzpth7Z5ca=s88-c-k-c0x00ffffff-no-rj"
                />
                <h1 className="font-semibold hidden lg:block">
                  {seller.profile.sellerName.split(" ")[0]}
                </h1>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                startIcon={<PersonIcon />}
                variant="contained"
              >
                Login
              </Button>
            )}

            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorderIcon sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton onClick={() => navigate("/cart")}>
              <AddShoppingCartIcon
                className="text-gray-700"
                sx={{ fontSize: 29 }}
              />
            </IconButton>

            {isLarge && (
              <Button
                onClick={() => navigate("/become-seller")}
                startIcon={<Storefront />}
                variant="outlined"
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>
        {showCategorySheet && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
            className="categorySheet absolute top-[4.41rem] left-20 right-20"
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>
    </>
  );
};
export default Navbar;
