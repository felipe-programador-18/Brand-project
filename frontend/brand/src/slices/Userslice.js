import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../services/User.service";


const initialState = {
    user:{},
    loading: false,
    error: false,
    success: false,
    message: null
}


export const Profile = createAsyncThunk("user/profile", async(user, thunkAPI) => {
    const token= thunkAPI.getState().auth.user.token;
    const data = await userService.Profile(user,token)
    return data;
})


export const UpdateProfile = createAsyncThunk("user/update",
 async(user,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.updateProfileUser(user,token)
    
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
} )


export const GetUserBy = createAsyncThunk("user/get", async (id,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.getUserById(id,token)
     
    return data;
})



export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
    resetMessage : (state) => {
        state.message = null
      }
    },

    extraReducers: (builder) => {
        builder
        .addCase(Profile.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(Profile.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(UpdateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(UpdateProfile.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            state.message = "User Profile Update with success!"
        }).addCase(UpdateProfile.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.user ={};
        }).addCase(GetUserBy.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(GetUserBy.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
    }
})


//reminder reducer always have state and action!

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;


