import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FAVOURITES_SLICE_NAME } from "../../constants/constants";
import { jsonApi } from "../../api/favourites";
import { favouritesState } from "../../model/initialFavourites";

const initialState = {
  favourites: favouritesState,
  isFetching: false,
  error: null,
};

export const isDuplicateFavourite = (favourites = [], candidate = {}) => {
  if (!candidate) return false;

  const candidateId = candidate.id;
  const candidateName = candidate.name?.trim().toLowerCase();
  const candidateLat = Number(candidate.lat);
  const candidateLon = Number(candidate.lon);

  return favourites.some((favourite) => {
    if (candidateId && favourite.id === candidateId) {
      return true;
    }

    if (
      candidateName &&
      favourite.name?.trim().toLowerCase() === candidateName
    ) {
      return true;
    }

    if (
      Number.isFinite(candidateLat) &&
      Number.isFinite(candidateLon) &&
      Number.isFinite(Number(favourite.lat)) &&
      Number.isFinite(Number(favourite.lon)) &&
      Math.abs(Number(favourite.lat) - candidateLat) < 1e-6 &&
      Math.abs(Number(favourite.lon) - candidateLon) < 1e-6
    ) {
      return true;
    }

    return false;
  });
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

      const existingResponse = await jsonApi.get(`/${FAVOURITES_SLICE_NAME}`);
      if (isDuplicateFavourite(existingResponse.data, favourite)) {
        return null;
      }

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

        if (payload) {
          state.favourites.push(payload);
        }
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
