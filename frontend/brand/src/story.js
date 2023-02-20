import { configureStore } from '@reduxjs/toolkit'


import AuthReducer from './slices/Authslice'


export const store = configureStore({
    reducer:{
      auth: AuthReducer  
    }
})