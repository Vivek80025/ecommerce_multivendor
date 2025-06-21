import { cartItem } from "../types/CartTypes";

export const sumCartItemSellingPrice = (cartItems: cartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.sellingPrice, 0);
};