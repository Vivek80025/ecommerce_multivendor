import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishlistState } from "../../types/wishlistTypes";
import { api } from "../../config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("wishlist fetch ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error);
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (
    { productId }: {productId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/wishlist/add-product/${productId}`,null,   //<-- no req body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(" add product ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("=========================================")
      return rejectWithValue(
        error.response?.data.message || "Failed to add product to wishlist"
      );
    }
  }
);

// Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getWishlistByUserId
    builder.addCase(getWishlistByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getWishlistByUserId.fulfilled,
      (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getWishlistByUserId.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );

    // addProductToWishlist
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addProductToWishlist.fulfilled,
      (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      addProductToWishlist.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
  },
});

export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;