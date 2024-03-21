import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    auth: {},
    isLoading: false,
    isError: false,
    message: '',
}

export const fetchAuthData = createAsyncThunk('auth/fetchAuthData', async ({ email, password }) => {
    const response = await axios.post('http://localhost:3001/login', { email, password });
    console.log(response.data); // Add this line to check the response from the server
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthData.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAuthData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.auth = payload;

            })
            .addCase(fetchAuthData.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export default authSlice.reducer;