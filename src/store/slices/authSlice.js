import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "../../api/favourites";
import { AUTH_SLICE_NAME } from "../../constants/constants";

const savedToken = localStorage.getItem("token");
let savedUser = null;
try {
  const stored = localStorage.getItem("user");
  if (stored) savedUser = JSON.parse(stored);
} catch {
  savedUser = null;
}

const initialState = {
  user: savedUser,
  token: savedToken || null,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  `${AUTH_SLICE_NAME}/loginUser`,
  async function (payload, { rejectWithValue }) {
    try {
      const response = await jsonApi.get(`/${AUTH_SLICE_NAME}`, {
        params: {
          email: payload.email.trim().toLowerCase(),
          password: payload.password,
        },
      });

      if (response.data.length === 0) {
        return rejectWithValue("invalidCredentials");
      }

      const user = response.data[0];
      const token = crypto.randomUUID();

      const { password, ...safeUser } = user; // eslint-disable-line

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));

return {
  user: safeUser,
  token,
};
    } catch (error) { // eslint-disable-line
      return rejectWithValue("serverError");
    }
  }
);

export const registerUser = createAsyncThunk(
  `${AUTH_SLICE_NAME}/registerUser`,
  async function (payload, { rejectWithValue }) {
    try {
      const cleanEmail = payload.email.trim().toLowerCase();

      const response = await jsonApi.get(`/${AUTH_SLICE_NAME}`, {
        params: {
          email: cleanEmail,
        },
      });

      if (response.data.length > 0) {
        return rejectWithValue("emailAlreadyExists");
      }

      const { data: user } = await jsonApi.post(
        `/${AUTH_SLICE_NAME}`, {
        ...payload,
        email: cleanEmail,
    });

      const token = crypto.randomUUID();

      const { password, ...safeUser } = user; // eslint-disable-line

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));

      return {
        user: safeUser,
        token,
      };
    } catch (error) { // eslint-disable-line
      return rejectWithValue("serverError");
    }
  }
);

export const validateToken = createAsyncThunk(
  `${AUTH_SLICE_NAME}/validateToken`,
  async function (_, { rejectWithValue }) {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return null;

      const { id } = JSON.parse(savedUser);
      const response = await jsonApi.get(`/${AUTH_SLICE_NAME}/${id}`);

      const { password, ...safeUser } = response.data; // eslint-disable-line
      localStorage.setItem("user", JSON.stringify(safeUser));

      return safeUser;
    } catch (error) { // eslint-disable-line
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue("sessionExpired");
    }
  }
);

export const updateUser = createAsyncThunk(
  `${AUTH_SLICE_NAME}/updateUser`,
  async function (payload, { rejectWithValue }) {
    try {
      const { id, ...userData } = payload;
      const response = await jsonApi.patch(`/${AUTH_SLICE_NAME}/${id}`, userData);

      const { password, ...safeUser } = response.data; // eslint-disable-line
      localStorage.setItem("user", JSON.stringify(safeUser));

      return safeUser;
    } catch (error) { // eslint-disable-line
      return rejectWithValue("serverError");
    }
  }
)

const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const setSuccess = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.loading = false;
  state.error = null;
};

const setUser = (state, { payload }) => {
  if (payload) {
    state.user = payload;
  }
  state.loading = false;
  state.error = null;
};

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    cleanError: (state) => {
      state.error = null;
    },
    continueAsGuest: (state) => {
      state.user = { firstName: "Guest", role: "guest" };
      state.token = "guest-session";
      state.error = null;
},
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, setSuccess);
    builder.addCase(loginUser.pending, setLoading);
    builder.addCase(loginUser.rejected, setError);

    builder.addCase(registerUser.fulfilled, setSuccess);
    builder.addCase(registerUser.pending, setLoading);
    builder.addCase(registerUser.rejected, setError);

    builder.addCase(validateToken.fulfilled, setUser);
    builder.addCase(validateToken.pending, setLoading);
    builder.addCase(validateToken.rejected, (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(updateUser.fulfilled, setUser);
    builder.addCase(updateUser.pending, setLoading);
    builder.addCase(updateUser.rejected, setError);
  }
})

export const { logoutUser, cleanError, continueAsGuest } = authSlice.actions;
export default authSlice.reducer;
