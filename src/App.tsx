import { ThemeProvider } from "@mui/material";
import "./App.css";
import Navbar from "./customer/components/navbar/Navbar";
import customeTheme from "./Theme/customeTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/ProductDetails/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import { Route, Routes, useNavigate } from "react-router-dom";
import BecomeSeller from "./customer/pages/Become Seller/BecomeSeller";
import SellerDashbord from "./seller/pages/SellerDashbord";
import AdminDashboard from "./admin/pages/AdminDashboard";
import { useAppDispatch, useAppSelector } from "./State/Store";
import { useEffect } from "react";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";
import PaymentSuccess from "./customer/pages/PaymentSuccess";
import Wishlist from "./customer/pages/WishList/Wishlist";
import { createHomeCategories, fetchHomePageData } from "./State/customer/homeCategorySlice";
import { homeCategories } from "./Data/homecategories";
import WriteReview from "./customer/pages/Review/WriteReview";
import SearchProducts from "./customer/pages/Search/SearchProducts";
import SellerAccountVerified from "./seller/pages/SellerAccountVerified";
import SellerAccountVerification from "./seller/pages/SellerAccountVerification";

function App() {

  const {seller,auth,sellerAuthSlice} = useAppSelector(store=>store)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchSellerProfile({jwt:localStorage.getItem("jwt")}))
  },[sellerAuthSlice.jwt,localStorage.getItem("jwt")])

  useEffect(()=>{
    dispatch(createHomeCategories(homeCategories))
  },[dispatch])

  

  // useEffect(()=>{
  //   if(seller.profile){
  //     navigate("/seller")
  //   }
  // },[seller.profile])

  useEffect(()=>{
    dispatch(fetchUserProfile({jwt: auth.jwt ||  localStorage.getItem("jwt")}));
  },[auth.jwt])

  return (
    <ThemeProvider theme={customeTheme}>
      <div>
        
        {/* <Home /> */}
        {/* <Product/> */}
        {/* <ProductDetails /> */}
        {/* <Review /> */}
        {/* <Cart/> */}
        {/* <Checkout/> */}
        {/* <Account /> */}

        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
          <Route path="/account/*" element={<Account/>} />
          <Route path="/become-seller" element={<BecomeSeller/>}/>

          {seller.profile && <Route path="/seller/*" element={<SellerDashbord />}/>}

          {auth.user?.role=== "ROLE_ADMIN" && <Route path="/admin/*" element={<AdminDashboard />}/>}
          
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/reviews/:productId" element={<Review />}/>

          <Route path="/review/:productId/create" element={<WriteReview />}/>
          
          <Route path="/search-product" element={<SearchProducts />}/>


          <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
          <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
          

        </Routes>


      </div>
    </ThemeProvider>
  );
}

export default App;
