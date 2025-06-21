import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { string } from "yup";
import { api } from "../config/Api";
import { User } from "../types/UserType";
import { useState } from "react";
import { useAppSelector } from "./Store";


export const sendLoginSignupOtp = createAsyncThunk("/auth/sendLoginSignupOtp",
  async({email}:{email:string}, {rejectWithValue})=>{
    try{
      console.log("my resend -",email);
      const response = await api.post("/auth/sent/login-signup-otp",{email})
      console.log("login-signup otp-",response)
      return response.data;
    }catch(error){
      console.log("error - - -",error);
    }
  }
)

export const signin = createAsyncThunk<any,any>("/auth/signin",
  async(loginRequest,{rejectWithValue})=>{
    try{
      const response = await api.post("/auth/signing",loginRequest.values)
      console.log("login jwt-",response.data)
      localStorage.setItem("jwt",response.data.jwt);
      loginRequest.navigate("/");
      return response.data.jwt;
    }catch(error){
      console.log("error-",error);
    }
  }
)


export const signup = createAsyncThunk<any,any>("/auth/signup",
  async(signupRequest,{rejectWithValue})=>{
    try{
      const response = await api.post("/auth/signup",signupRequest.values)
      console.log("signup jwt-",response.data)
      localStorage.setItem("jwt",response.data.jwt);
      signupRequest.navigate("/")
      return response.data.jwt;
    }catch(error){
      console.log("error-",error);
    }
  }
)

export const logout = createAsyncThunk<any,any>("/auth/logout",
  async(navigate,{rejectWithValue})=>{
    try{
      localStorage.clear();
      console.log("logout success");
      navigate("/");
    }catch(error){
      console.log("logout error-",error);
    }
  }
)

export const fetchUserProfile = createAsyncThunk<any,any>("/auth/fetchUserProfile",
  async({jwt},{rejectWithValue})=>{
    try{
      const response = await api.get("/users/profile",{
        headers:{
          Authorization: `Bearer ${jwt}`,
        },
      })
      console.log("user profile--",response.data)
      return response.data;
    }catch(error){
      console.log("error---",error);
    }
  }
)

interface AuthState{
  jwt: string | null,
  otpSent: boolean,
  isLoggedIn: boolean,
  user: User | null,
  loading: boolean , 
}
const initialState:AuthState = {
  jwt:null,
  otpSent:false,
  isLoggedIn:false,
  user: null,
  loading: false 
}

// const initialState: AuthState = {
//     jwt: null,
//     role: null,
//     loading: false,
//     error: null,
//     otpSent:false
// };

const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(sendLoginSignupOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendLoginSignupOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(sendLoginSignupOtp.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(signin.fulfilled,(state,action)=>{
              state.jwt = action.payload;
              state.isLoggedIn = true
            })
            .addCase(signup.fulfilled,(state,action)=>{
              state.jwt = action.payload;
              state.isLoggedIn = true;
            })
            .addCase(fetchUserProfile.fulfilled,(state,action)=>{
              state.user = action.payload;
              state.isLoggedIn=true;
            })
            .addCase(logout.fulfilled,(state)=>{
              state.jwt = null;
              state.isLoggedIn = false;
              state.user = null;
            })
  }
})

export default authSlice.reducer;