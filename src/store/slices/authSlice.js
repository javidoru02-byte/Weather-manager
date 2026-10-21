import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_SLICE_NAME } from "../../constants/constants";
import {
  registerRequest,
  loginRequest,
  changePasswordRequest,
  updateUserRequest,
} from "../../api/auth";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isFetching: false,
  error: null,
};

export const register = createAsyncThunk(
  `${AUTH_SLICE_NAME}/register`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await registerRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  },
);

export const login = createAsyncThunk(
  `${AUTH_SLICE_NAME}/login`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  `${AUTH_SLICE_NAME}/changePassword`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await changePasswordRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  `${AUTH_SLICE_NAME}/updateUser`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateUserRequest(payload);
      return response.data; // { id, name, email }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  },
);

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isFetching = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.user = payload.user;
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
        localStorage.setItem("user", JSON.stringify(payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })

      .addCase(changePassword.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isFetching = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const logoutUser = logout; 
export default authSlice.reducer;