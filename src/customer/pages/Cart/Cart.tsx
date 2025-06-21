import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Close, Favorite, LocalOffer } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserCart } from "../../../State/customer/cartSlice";
import { applyCoupon } from "../../../State/customer/couponSlice";

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Cart = () => {
  const navigate = useNavigate();
  const [couponCode,setCouponCode] = useState("");
  const dispatch = useAppDispatch();
  const handleChange=(e:any)=>{
    setCouponCode(e.target.value)

  }
  const {cart,coupon} = useAppSelector(store=>store);

  useEffect(()=>{
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
  },[])

  const handleAppllyCoupon = (apply: string) => {
    // console.log(couponCode,apply)

    var code = couponCode;

    if (apply == "false") {
      code = cart.cart?.couponCode || "";
    }

    dispatch(
      applyCoupon({
        apply,
        code,
        orderValue: cart.cart?.totalSellingPrice || 100,
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  };

  //snackbar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (coupon.couponApplied || coupon.error) {
      setOpen(true);
      setCouponCode("");
    }
  }, [coupon.couponApplied, coupon.error]);

  return (
    <>
    {cart.cart && cart.cart.cartItems.length !== 0 ? (
      <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {cart.cart?.cartItems.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <div className="border border-gray-300 rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 text-sm items-center">
              <div className="flex items-center">
                <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
              </div>
              <span>Apply Coupons</span>
            </div>
            {!cart.cart.couponCode ? (<div className="flex items-center justify-between">
              <TextField
              onChange={handleChange}
                id="outlined-basic"
                placeholder="coupon code"
                size="small"
                variant="outlined"
              />
              <Button 
              onClick={()=>handleAppllyCoupon("true")} disabled={couponCode ? false : true} size="small">
                Apply
              </Button>
            </div>)
            :(<div className="flex">

              <div className="p-1 pl-5 pr-3 border border-gray-300 rounded-md flex gap-2 items-center">
                <span className="">TAN50 Applied</span>
                <IconButton
                onClick={() => handleAppllyCoupon("false")}
                 size="small">
                  <Close className="text-red-600"/>
                </IconButton>
              </div>
             </div>)}
          </div>

          <div className="border border-gray-300 rounded-md">
             <PricingCard/>
             <div className="p-5">
              <Button
               onClick={()=>navigate("/checkout")}
               variant="contained"
               sx={{py:"11px"}}
               fullWidth
              >Buy now</Button>
             </div>
          </div>
        </div>
      </div>
    </div>
    ):(
      <div className="h-[85vh] flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">hay its feels so light!</h1>
            <p className="text-gray-500 text-sm">
              there is nothing in your bag, lets add some items
            </p>
          </div>
          <Button variant="outlined" sx={{ py: "11px" }}>
            Add Item From Wishlist
          </Button>
        </div>
    )}

    <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={coupon.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {coupon.error ? coupon.error : "Coupon Applied successfully"}
        </Alert>
      </Snackbar>
    
    </>
  );
};

export default Cart;
