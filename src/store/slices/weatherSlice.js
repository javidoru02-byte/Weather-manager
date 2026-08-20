import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WEATHER_SLICE_NAME } from "../../constants/constants";
import { weatherApi } from "../../api/favourites";

const initialState = {
  weather: null,
  weather5Day: null,
  isFetching: false,
  error: null,
};

export const getWeather = createAsyncThunk(
  `${WEATHER_SLICE_NAME}/getWeather`,
  async (city, { rejectWithValue }) => {
    try {
      const response = await weatherApi.get("/weather", {
        params: {
          q: city,
        },
      });

      if (response.status >= 400) {
        throw new Error(`Error status is ${response.status}`);
      }

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getFiveDayWeather = createAsyncThunk(
  `${WEATHER_SLICE_NAME}/getFiveDayWeather`,
  async (city, { rejectWithValue }) => {
    try {
      const response = await weatherApi.get("/forecast", {
        params: {
          q: city,
        },
      });

      if (response.status >= 400) {
        throw new Error(`Error status is ${response.status}`);
      }

      const { data } = response;
      return data;
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

const weatherSlice = createSlice({
  name: WEATHER_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, setFetching)
      .addCase(getWeather.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.weather = payload;
      })
      .addCase(getWeather.rejected, setError)
      .addCase(getFiveDayWeather.pending, setFetching)
      .addCase(getFiveDayWeather.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.error = null;
        state.weather5Day = payload;
      })
      .addCase(getFiveDayWeather.rejected, setError);
  },
});

export default weatherSlice.reducer;
