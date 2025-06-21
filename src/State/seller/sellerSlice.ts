import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Seller, SellerReport } from "../../types/SellerTypes";
import axios from "axios";

export const fetchSellerProfile = createAsyncThunk<any,any>("sellers/fetchSellerProfile", 
  async({jwt},{rejectWithValue}) => {
    try{
      const response = api.get("/sellers/profile",{
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      })
      console.log("fetch seller profile: ",(await response).data)
      return (await response).data;

    } catch(error){
      console.log("error - - - "+error);
    }

  }

)

export const updateSeller = createAsyncThunk<
  Seller, any 
>(
  "sellers/updateSeller",
  async (
      seller : any,
    { rejectWithValue }
  ) => {
    console.log("seller update request ",seller)
    try {
      const response = await api.patch(`/sellers`, seller,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("seller updated successfully", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Update seller error response data:",
          error.response
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);

export const fetchSellerReport = createAsyncThunk<
  SellerReport,
  string, // JWT token type
  { rejectValue: string }
>("sellers/fetchSellerReport", async (jwt: string, { rejectWithValue }) => {
  try {
    const response = await api.get<SellerReport>(`sellers/report`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("Fetch seller report", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error ", error);
    if (error.response) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch seller report");
  }
});


export const fetchSellers = createAsyncThunk<Seller[], string>(
  "sellers/fetchSellers",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller[]>("/sellers", {
        params: {
          status,
        },
      });
      console.log("fetch sellers", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch sellers error response data:",
          error.response.data
        );
        console.error(
          "Fetch sellers error response status:",
          error.response.status
        );
        console.error(
          "Fetch sellers error response headers:",
          error.response.headers
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch sellers error message:", error.message);
        return rejectWithValue("Failed to fetch sellers");
      }
    }
  }
);


export const updateSellerAccountStatus = createAsyncThunk<
  Seller,
  { id: number; status: string }
>(
  "sellers/updateSellerAccountStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/seller/${id}/status/${status}`);
      console.log("update  seller status: ", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Update seller error response data:",
          error.response.data
        );

        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error.message);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);



export const verifySellerEmail = createAsyncThunk<
  any,
  { otp: string; navigate: any }
>(
  "sellers/verifySellerEmail",
  async ({ otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/sellers/verify/${otp}`);
      navigate("/seller-account-verified");
      console.log("verifiy seller email ", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Update seller error response data:",
          error.response.data
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error.message);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);



interface SellerState{
  sellers:Seller[],
  selectedSeller:any,
  profile:Seller | null,
  report:SellerReport | null,
  loading:boolean,
  error:any,
  profileUpdated: boolean,
} 

const initialState:SellerState = {
  sellers:[],
  selectedSeller:null,
  profile:null,
  report:null,
  loading:false,
  error:null,
  profileUpdated: false,
}

const sellerSlice = createSlice({
  name:"sellers",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchSellerProfile.pending,(state)=>{
      state.loading=true
    })
    .addCase(fetchSellerProfile.fulfilled,(state,action)=>{
      state.loading=false;
      state.profile = action.payload; 
    })
    .addCase(fetchSellerProfile.rejected,(state,action)=>{
      state.loading=false;
      state.error = action.payload; 
    })

    .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated=false;
      })
      .addCase(
        updateSeller.fulfilled,
        (state, action) => {
          const index = state.sellers.findIndex(
            (seller) => seller.id === action.payload.id
          );
          if (index !== -1) {
            state.sellers[index] = action.payload;
          }
          state.profile=action.payload
          state.loading = false;
          state.profileUpdated=true;
        }
      )
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update seller";
      })
      // seller report
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetch sellers
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellers.fulfilled,
        (state, action) => {
          state.sellers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      })

      // update seller status
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSellerAccountStatus.fulfilled,
        (state, action) => {
          const index = state.sellers.findIndex(
            (seller) => seller.id === action.payload.id
          );
          if (index !== -1) {
            state.sellers[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update seller";
      })
  }
})
export default sellerSlice.reducer;