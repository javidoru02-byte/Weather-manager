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
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const enteredPassword = String(password);

      const { data: users } = await jsonApi.get(`/${AUTH_SLICE_NAME}`);

      const user = users.find(
        (u) =>
          u.email?.trim().toLowerCase() === cleanEmail &&
          String(u.password) === enteredPassword
      );

      if (!user) {
        return rejectWithValue("invalidCredentials");
      }

      const token = crypto.randomUUID();
      const safeUser = Object.fromEntries(
        Object.entries(user).filter(([key]) => key !== "password")
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));

      return {
        user: safeUser,
        token,
      };
    } catch {
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

export const changePassword = createAsyncThunk(
  `${AUTH_SLICE_NAME}/changePassword`,
  async function ({ id, currentPassword, newPassword }, { rejectWithValue }) {
    try {
      const { data: user } = await jsonApi.get(`/${AUTH_SLICE_NAME}/${id}`);

      if (String(user.password) !== String(currentPassword)) {
        return rejectWithValue("wrongCurrentPassword");
      }

      await jsonApi.patch(`/${AUTH_SLICE_NAME}/${id}`, {
        password: String(newPassword),
      });

      return true;
    } catch {
      return rejectWithValue("serverError");
    }
  }
);

export const sendResetCode = createAsyncThunk(
  `${AUTH_SLICE_NAME}/sendResetCode`,
  async function ({ email }, { rejectWithValue }) {
    try {
      const { data: users } = await jsonApi.get(`/${AUTH_SLICE_NAME}`);
      const user = users.find(
        (u) => u.email?.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (!user) {
        return rejectWithValue("userNotFound");
      }

      const code = String(Math.floor(100000 + Math.random() * 900000)); // потім підключимо бекенд (Kiril)
      sessionStorage.setItem("reset_session", JSON.stringify({ email, code }));

      console.log(
        `[EMAIL DEMO] Лист надіслано на ${email}. Ваш код: ${code}`,
      ); // на етапі тестування поки без бекенду (Kiril)

      return { code };
    } catch {
      return rejectWithValue("serverError");
    }
  }
);

export const resetPasswordWithCode = createAsyncThunk(
  `${AUTH_SLICE_NAME}/resetPasswordWithCode`,
  async function ({ email, code, newPassword }, { rejectWithValue }) {
    try {
      const savedSession = sessionStorage.getItem("reset_session");
      if (!savedSession) {
        return rejectWithValue("codeExpired");
      }

      const parsed = JSON.parse(savedSession);
      if (
        parsed.email.toLowerCase() !== email.toLowerCase() ||
        String(parsed.code) !== String(code).trim()
      ) {
        return rejectWithValue("invalidCode");
      }

      const { data: users } = await jsonApi.get(`/${AUTH_SLICE_NAME}`);
      const user = users.find(
        (u) => u.email?.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (!user) {
        return rejectWithValue("userNotFound");
      }

      await jsonApi.patch(`/${AUTH_SLICE_NAME}/${user.id}`, {
        password: String(newPassword),
      });

      sessionStorage.removeItem("reset_session");
      return true;
    } catch {
      return rejectWithValue("serverError");
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  `${AUTH_SLICE_NAME}/loginWithGoogle`,
  async function (credential, { rejectWithValue }) {
    try {
      const base64Url = credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const googleData = JSON.parse(jsonPayload);

      const cleanEmail = googleData.email.trim().toLowerCase();
      const { data: users } = await jsonApi.get(`/${AUTH_SLICE_NAME}`);
      let user = users.find((u) => u.email?.trim().toLowerCase() === cleanEmail);

      if (!user) {
        const newUser = {
          email: cleanEmail,
          firstName: googleData.given_name || "",
          lastName: googleData.family_name || "",
          middleName: "",
          phone: "",
          avatar: googleData.picture || "",
          isGoogleAuth: true,
        };
        const res = await jsonApi.post(`/${AUTH_SLICE_NAME}`, newUser);
        user = res.data;
      }

      const token = crypto.randomUUID();
      const safeUser = Object.fromEntries(
        Object.entries(user).filter(([key]) => key !== "password")
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));

      return {
        user: safeUser,
        token,
      };
    } catch {
      return rejectWithValue("serverError");
    }
  }
);

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

const setDone = (state) => {
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
  },
  extraReducers: (builder) => {
    // вхід
    builder.addCase(loginUser.fulfilled, setSuccess);
    builder.addCase(loginUser.pending, setLoading);
    builder.addCase(loginUser.rejected, setError);
    // реєстрація
    builder.addCase(registerUser.fulfilled, setSuccess);
    builder.addCase(registerUser.pending, setLoading);
    builder.addCase(registerUser.rejected, setError);
    // перевірка токена
    builder.addCase(validateToken.fulfilled, setUser);
    builder.addCase(validateToken.pending, setLoading);
    builder.addCase(validateToken.rejected, (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = payload;
    });
    // оновлення профіля
    builder.addCase(updateUser.fulfilled, setUser);
    builder.addCase(updateUser.pending, setLoading);
    builder.addCase(updateUser.rejected, setError);
    // зміна пароля
    builder.addCase(changePassword.pending, setLoading);
    builder.addCase(changePassword.fulfilled, setDone);
    builder.addCase(changePassword.rejected, setError);

    // відправка коду
    builder.addCase(sendResetCode.pending, setLoading);
    builder.addCase(sendResetCode.fulfilled, setDone);
    builder.addCase(sendResetCode.rejected, setError);

    // встановка нового пароля за кодом
    builder.addCase(resetPasswordWithCode.pending, setLoading);
    builder.addCase(resetPasswordWithCode.fulfilled, setDone);
    builder.addCase(resetPasswordWithCode.rejected, setError);
    // google login
    builder.addCase(loginWithGoogle.pending, setLoading);
    builder.addCase(loginWithGoogle.fulfilled, setSuccess);
    builder.addCase(loginWithGoogle.rejected, setError);
  }
})

export const { logoutUser, cleanError } = authSlice.actions;
export default authSlice.reducer;
