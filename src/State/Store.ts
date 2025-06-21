import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from "./seller/sellerProductSlice"
import productSlice from "./customer/ProductSlice"
import authSlice from "./AuthSlice"
import cartSlice from "./customer/cartSlice"
import orderSlice from "./customer/orderSlice"
import wishlistSlice from "./customer/wishlistSlice"
import sellerOrderSlice from "./seller/sellerOrderSlice"
import transactionSlice from "./seller/transactionSlice"
import homeCategorySlice from "./customer/homeCategorySlice"
import dealSlice from "./admin/DealSlice" 
import couponSlice from "./customer/couponSlice"
import ReviewSlice from "./customer/ReviewSlice"
import revenueSlice from "./seller/revenueChartSlice"
import adminCouponSlice from "./admin/AdminCouponSlice"

import sellerAuthSlice from "./seller/sellerAuthSlice"

const rootReducer = combineReducers({
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  sellerOrder:sellerOrderSlice,
  transactions: transactionSlice,
  home:homeCategorySlice,
  deals: dealSlice,
  coupon: couponSlice,
  review: ReviewSlice,
  revenue: revenueSlice,
  adminCoupon: adminCouponSlice,
  sellerAuthSlice: sellerAuthSlice,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch; //what kind of dispatch your store uses.
export type RootState = ReturnType<typeof rootReducer>;  //const user = useSelector((state: RootState) => state.user);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector;

export default store