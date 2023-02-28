import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit"
import ProductService from "../services/Product.service"


const initialState = {
    loading: null,
    error: false,
    success:false,
    products:[],
    product:{},
    message:null
}



// to get work together with my servicepublic
export const PublicProduct = createAsyncThunk("product/public", 
 async(product,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data= await ProductService.publicProduct(product,token)
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }    
    return data

})

// to deleted my date!!
export const DeletedProduct = createAsyncThunk("product/delete", 
async(id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = await ProductService.DeletedProduct(id, token)
  
  if(data.erros){
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  
  return data;
})

//to get Product user 
export const getProductUser = createAsyncThunk("product/getuser", 
async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await ProductService.getProductUserId(id,token)
    return data;
})


//to create my edit slice....
export const EditProductBrand = createAsyncThunk("product/edit" ,
 async(ProductDate, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token
  const data = await ProductService.EditProduct({title: ProductDate.title},ProductDate.id,token)
  
  if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
  }

  return data
 } )


// to get Product id
export const getUserProductId = createAsyncThunk("product/productuserid", 
async(id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token
  const data = await ProductService.getUserId(id, token)
  return data;
})

export const CommentProduct = createAsyncThunk("product/comments",  
async(ProductDate, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = await ProductService.CommentProduct({
    comment: ProductDate.comment
  },ProductDate.id, 
  token)
   
  if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  return data ;
})

export const LikeProduct = createAsyncThunk("product/likes", 
async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = ProductService.LikeProduct(id, token)

  if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  return data ;
})

export const getAllProduct = createAsyncThunk("product/allproducts", async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await ProductService.getAllProduct(id,token)
    return data;
     
})

export const SearchProduct = createAsyncThunk("product/search", 
async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await ProductService.SearchProduct(id,token)
   
    return data;
})


export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers: {
      resetMessage:(state) => {
       state.message = null
      }
    },

    extraReducers:(builder) => {
      builder.addCase(PublicProduct.pending, (state) => {
        state.loading = true;
        state.error = false
      })
      .addCase(PublicProduct.fulfilled, (state, action) => {
        state.loading= false;
        state.error = null ;
        state.success= true;
        state.product =action.payload;
        state.products.unshift(state.product)
        state.message = "Product it updated with success!"
      })
      .addCase(PublicProduct.rejected, (state, action) => {
        state.loading= false;
        state.error = action.payload;
        state.product = {}
      })
      .addCase(DeletedProduct.pending, (state) => {
        state.loading= true;
        state.error= false;
      })
      .addCase(DeletedProduct.fulfilled, (state, action) => {
        state.loading= false;
        state.error = null;
        state.success= true;
        // to pay attention about this
        state.products = state.products.filter((product) => {
          return product._id !== action.payload.id
        })
        state.message= action.payload.message ;
      })
      .addCase(DeletedProduct.rejected, (state, action) => {
        state.loading = false ;
        state.error= action.payload;
        state.product ={};
      })
      .addCase(getProductUser.pending, (state) => {
         state.loading = true;
         state.error = null;
      })
      .addCase(getProductUser.fulfilled, (state,action) => {
        state.loading = false;
        state.error =null ;
        state.success = true;
        state.products = action.payload;
      }) 
      .addCase(EditProductBrand.pending, (state) =>{
        state.loading = true;
        state.error = false;
      })
      .addCase(EditProductBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.products.map((product) => {
          if(product._id === action.payload.product.id){
           return product.title = action.payload.product.title
          }
          return product
        })
        state.message = action.payload.message;
      })
      .addCase(EditProductBrand.rejected, (state,action) => {
         state.loading = false;
         state.error = action.payload;
         state.product = {}
      })
      .addCase(getUserProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProductId.fulfilled, (state,action) => {
        state.loading = false;
        state.error = false;
        state.message = true;
        state.product = action.payload; 
      })
      .addCase(CommentProduct.fulfilled, (state, action) => {
        state.loading = false ;
        state.error = null;
        state.success =true;
        state.product.comments.push(action.payload.comment)
        state.message = action.payload.message;
      })
      .addCase(CommentProduct.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(LikeProduct.fulfilled, (state,action) => {
        state.loading = false ;
        state.error = null;
        state.success = true;
        state.message = action.payload.message;
        
        if(state.product.likes){
          state.product.likes.push(action.payload.userId)
         }
        
         state.products.map((product) => {
          if(product._id === action.payload.productId){
             return product.likes.push(action.payload.userId)  
             }
             return product;
         })
      })
      .addCase(LikeProduct.rejected,(state,action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProduct.fulfilled, (state,action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.products =action.payload;
      })
      .addCase(SearchProduct.pending, (state) => {
        state.loading= true;
        state.error = false;
      })
      .addCase(SearchProduct.fulfilled, (state,action) => {
        state.loading = false;
        state.error = null;
        state.success= true;
        state.products = action.payload;
      })
    }
})

export const {resetMessage} = productSlice.actions;
export default productSlice.reducer;