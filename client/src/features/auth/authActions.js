// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const backendURL = 'http://localhost:3001';

// export const userLogin = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };
//         const { data } = await axios.post(
//             `${backendURL}/login`,
//             { email, password },
//             config
//         );

//         return data.user;
//     } catch (error) {
//         if (error.response && error.response.data.message) {
//             return rejectWithValue(error.response.data.message);
//         } else {
//             return rejectWithValue(error.message);
//         }
//     }
// });
