
import ElectronicsCategory from "./ElectronicsCategory/ElectronicsCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-5 lg:space-y-10 relative pb-20">
      <ElectronicsCategory />
      <CategoryGrid />

      <section className="pt-5 lg:pt-20">
        <h1
          className="text-lg lg:text-4xl font-bold text-primary-color text-center
      pb-5 lg:pb-10 pt-5 lg:pt-20"
        >
          TODAY'S DEAL
        </h1>
        <Deal />
      </section>
      <section className="py-5 lg:pt-20">
        <h1
          className="text-lg lg:text-4xl font-bold text-primary-color text-center
      pb-5 lg:pb-10 pt-5 lg:pt-20"
        >
          SHOP BY CATEGORY
        </h1>
        <ShopByCategory />
      </section>
      <section className="lg:px-20 relative h-[200px] lg:h-[450px] object-cover">
        <img
          className="w-full h-full"
          src={"/seller_banner_image.jpg"}
          alt=""
        />
        <div className="absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
          <h1>Sell your Product</h1>
          <p>
            <span className="text-lg md:text-2xl">With</span>
            <span className="logo"> Vivek Bazzar</span>
          </p>
          <div className="pt-6 flex justify-center">
            <Button onClick={() => navigate("/become-seller")} startIcon={<Storefront/>} variant="contained" size="large">Become Seller</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
