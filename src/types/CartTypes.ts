import { Product } from "./ProductType";
import { User } from "./UserType";

export interface cartItem {
    id: number;
    cart?: Cart;
    product: Product;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number;
    userId: number;
}


export interface Cart {
    id: number;
    user: User;
    cartItems: cartItem[];
    totalSellingPrice: number;
    totalItem: number;
    totalMrpPrice: number;
    discount: number;
    couponCode: string | null;
  }