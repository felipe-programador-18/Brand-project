import { configureStore } from '@reduxjs/toolkit'


import authReducer from './slices/Authslice'
import userReducer from './slices/Authslice'
import productReducer from "./slices/Productslice"

export const store = configureStore({
    reducer:{
      auth: authReducer,
      user: userReducer,
      product: productReducer  
    }
})