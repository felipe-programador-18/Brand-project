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
    const token= thunkAPI.getState().auth.user.token
    const data = await userService.Profile(user,token)
    return data;
})


export const UpdateProfile = createAsyncThunk("user/update", async(user,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await userService.updateProfileUser(user,token)
    return data;
} )


export const GetUserBy = createAsyncThunk("user/get", async (id,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    const data = await userService.getUserById(id,token)
     
    return data;
})