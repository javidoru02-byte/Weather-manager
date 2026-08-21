import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FAVOURITES_SLICE_NAME } from "../../constants/constants";
import { jsonApi } from "../../api/favourites";
import { favouritesState } from "../../model/initialFavourites";

const initialState = {
  favourites: favouritesState,
  isFetching: false,
  error: null,
};

export const getFavourites = createAsyncThunk(
  `${FAVOURITES_SLICE_NAME}/getFavourites`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await jsonApi.get(`/${FAVOURITES_SLICE_NAME}`);

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addFavourite = createAsyncThunk(
  `${FAVOURITES_SLICE_NAME}/addFavourites`,
  async (payload, { rejectWithValue }) => {
    try {
      const { name, id, coord } = payload;
      const favourite = {
        name,
        id,
        lat: coord.lat,
        lon: coord.lon,
      };
      const response = await jsonApi.post(
        `/${FAVOURITES_SLICE_NAME}`,
        favourite,
      );

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const delFavourite = createAsyncThunk(
  `${FAVOURITES_SLICE_NAME}/delFavourite`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await jsonApi.delete(`/${FAVOURITES_SLICE_NAME}/${id}`);

      if (response.status >= 400) {
        throw new Error(`Error status is ${response.status}`);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
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
  extraReducers: (builder) => {
    builder
      // Getting
      .addCase(getFavourites.pending, setFetching)
      .addCase(getFavourites.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.favourites = payload;
      })
      .addCase(getFavourites.rejected, setError)
      // Adding
      .addCase(addFavourite.pending, setFetching)
      .addCase(addFavourite.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.favourites.push(payload);
      })
      .addCase(addFavourite.rejected, setError)
      // Deleting
      .addCase(delFavourite.pending, setFetching)
      .addCase(delFavourite.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.favourites = [
          ...state.favourites.filter((favourite) => {
            return favourite.id !== payload;
          }),
        ];
      });
  },
});

export default favouritesSlice.reducer;
