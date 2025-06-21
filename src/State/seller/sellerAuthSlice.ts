import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Seller } from "../../types/SellerTypes";
import axios from "axios";

interface SellerAuthState {
  error: string | null;
  loading: boolean;
  jwt: string | null;
  sellerCreated: string | null;
}
const initialState: SellerAuthState = {
    error: null,
    loading: false,
    jwt: null,
    sellerCreated:""
};

export const sellerLogin = createAsyncThunk<any,any>("/sellerAuth/sellerLogin",
  async(loginRequest, {rejectWithValue})=>{
    try{

      console.log("---------------"+"("+loginRequest.email+","+loginRequest.otp+")")
      const response = await api.post("/sellers/login",loginRequest.values)
      console.log("login response-",response.data)
      
      localStorage.setItem("jwt",response.data.jwt);
      loginRequest.navigate("/");
      return response.data
    }catch(error){
      console.log("error - - -",error);
    }
  }
);


export const createSeller = createAsyncThunk<Seller, Seller>(
    'sellers/createSeller',
    async (seller: Seller, { rejectWithValue }) => {
        try {
            const response = await api.post<Seller>("/sellers", seller);
            console.log('create seller', response.data);
            return response.data;
        } catch (error:any) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Create seller error response data:', error.response.data);
                console.error('Create seller error response status:', error.response.status);
                console.error('Create seller error response headers:', error.response.headers);
                return rejectWithValue(error.message);
            } else {
                console.error('Create seller error message:', error.message);
                return rejectWithValue('Failed to create seller');
            }
        }
    }
);

const sellerAuthSlice = createSlice({
  name: 'sellerAuth',
    initialState,
    reducers: {
        resetSellerAuthState: (state) => {
            state.error = null;
            state.loading = false;
            state.jwt = null;
        },
    },

    extraReducers:(builder)=>{
      builder
           .addCase(sellerLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sellerLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(sellerLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // create new seller
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state, action) => {
                // state.sellers.push(action.payload);
                state.sellerCreated = "verification email sent to you"
                state.loading = false;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to create seller';
            });
    }
});

export const { resetSellerAuthState } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;