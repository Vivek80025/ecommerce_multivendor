import { cartItem } from "../types/CartTypes";

export const sumCartItemMrpPrice = (cartItems: cartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.mrpPrice, 0);
};



/*
const cartItems = [
  { mrpPrice: 100, quantity: 2 },
  { mrpPrice: 50, quantity: 3 },
  { mrpPrice: 200, quantity: 1 }
]; 

acc(accumulator) = 0

1. 0+100*2 = 200
acc = 200

2. 200+50*3 = 350
acc = 350
|
|
|

*/