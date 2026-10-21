import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FAVOURITES_SLICE_NAME } from "../../constants/constants";
import {
  fetchFavourites,
  createFavourite,
  removeFavourite,
} from "../../api/favourites";

const initialState = {
  favourites: [],
  isFetching: false,
  error: null,
};

export const getFavourites = createAsyncThunk(
  `${FAVOURITES_SLICE_NAME}/getFavourites`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFavourites();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  },
);

export const addFavourite = createAsyncThunk(
  `${FAVOURITES_SLICE_NAME}/addFavourite`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createFavourite(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  },
);

export const delFavourite = createAsyncThunk(
  `${FAVOURITES_SLICE_NAME}/delFavourite`,
  async (cityId, { rejectWithValue }) => {
    try {
      await removeFavourite(cityId);
      return cityId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  },
);

const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};

const setFetching = (state) => {
  state.isFetching = true;
  state.error = null;
};

const favouritesSlice = createSlice({
  name: FAVOURITES_SLICE_NAME,
  initialState,
  reducers: {
    clearFavourites: (state) => {
      state.favourites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavourites.pending, setFetching)
      .addCase(getFavourites.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.favourites = payload;
      })
      .addCase(getFavourites.rejected, setError)

      .addCase(addFavourite.pending, setFetching)
      .addCase(addFavourite.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.favourites.push(payload);
      })
      .addCase(addFavourite.rejected, setError)

      .addCase(delFavourite.pending, setFetching)
      .addCase(delFavourite.fulfilled, (state, { payload: cityId }) => {
        state.isFetching = false;
        state.error = null;
        state.favourites = state.favourites.filter(
          (favourite) => favourite.city_id !== cityId,
        );
      })
      .addCase(delFavourite.rejected, setError);
  },
});

export const { clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;