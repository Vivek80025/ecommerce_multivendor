import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductType";

export const fetchSellerProduct = createAsyncThunk<Product[],any>(
  "sellerProduct/fetchSellerProduct",
  async(jwt)=>{
    try{
      const response = await api.get("/sellers/products",{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      const data = response.data;
      console.log("seller product----------",data);
      return data;
    }catch(error){
      console.log("error----------",error);
      throw error;
    }
  }
)

export const createProduct=createAsyncThunk<Product,{request:any , jwt:string | null}>(
  "sellerProduct/createProduct",
  async(args)=>{
    const {request, jwt} = args;
    try{
      const response=await api.post("/sellers/products",request,{
        headers:{
          Authorization: `Bearer ${jwt}`,
        },
      })
      console.log("product created-----------",response.data)
      return response.data;
    }catch(error){
      console.log("error---------",error);
      // throw error;
    }
  }
)

interface SellerProductState{
  products: Product[];
  loading:boolean;
  error: string | null | undefined;
  productCreated: boolean;
}

const initialState:SellerProductState={
  products: [],
  loading: false,
  error: null,
  productCreated: false,
}

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchSellerProduct.pending,(state)=>{
      state.loading=true;
    })
    .addCase(fetchSellerProduct.fulfilled,(state,action)=>{
      state.loading=false;
      state.products=action.payload;
    })
    .addCase(fetchSellerProduct.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message;
    })


    .addCase(createProduct.pending,(state)=>{
      state.loading = true;
      state.error = null;
      state.productCreated = false;
    })
    .addCase(createProduct.fulfilled,(state,action)=>{
      state.loading=false;
      state.products.push(action.payload);
      state.productCreated = true;
    })
    .addCase(createProduct.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message || "Failed to create product";
      state.productCreated = false;
    })
    
  }
})

export default sellerProductSlice.reducer;