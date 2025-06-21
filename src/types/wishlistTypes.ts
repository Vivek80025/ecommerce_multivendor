import { Product } from "./ProductType";
import { User } from "./UserType";

export interface Wishlist {
  id: number;
  user: User;
  products: Product[];
}

export interface WishlistState {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
}

// Payload interfaces for async thunks
export interface AddProductToWishlistPayload {
  wishlistId: number;
  productId: number;
}