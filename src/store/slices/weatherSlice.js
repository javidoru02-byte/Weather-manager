import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiForToday, forecastApi, apiKey } from "../../constants/WeatherApi";

const initialState = {
  weatherData: null,
  forecastData: null,
  loading: false,
  error: null,
};

export const getWeather = createAsyncThunk(
  "weather/getWeather",

  async function (city, { rejectWithValue }) {
    try {
      const forToday = await axios.get(
        `${apiForToday}?q=${city}&appid=${apiKey}&units=metric`,
      );

      return forToday.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getWeatherForFiveDays = createAsyncThunk(
  "weather/getWeatherForFiveDays",

  async function (city, { rejectWithValue }) {
    try {
      const forFiveDays = await axios.get(
        `${forecastApi}?q=${city}&appid=${apiKey}&units=metric`,
      );

      return forFiveDays.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};
const weatherSlice = createSlice({
  name: `weather`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, { payload }) => {
      state.weatherData = payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getWeather.rejected, setError);
    builder.addCase(getWeather.pending, setLoading);

    builder.addCase(getWeatherForFiveDays.fulfilled, (state, { payload }) => {
      state.forecastData = payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getWeatherForFiveDays.rejected, setError);
    builder.addCase(getWeatherForFiveDays.pending, setLoading);
  },
});

export default weatherSlice.reducer;
