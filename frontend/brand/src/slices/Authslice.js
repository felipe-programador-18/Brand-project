import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from '../services/Authservice'


const user = localStorage.getItem("user")

const InitialState = {
    user: user? user:null,
    loading: null,
    error: null,
    sucess: false
}


//service register to connection with my service
export const register = createAsyncThunk("auth/register",
 async (user, thunkAPI) => {
  
    const data = await AuthService.registerNew(user)

    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
   return data
})

//logout
export const logout = createAsyncThunk("auth/logout", async() =>{
  await AuthService.logoutUser()
})

//login
export const login = createAsyncThunk("auth/login", 
async(user, thunkAPI) => {
  
  const data = await AuthService.login(user)

  if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
  }

})



export const  authSlice = createSlice()