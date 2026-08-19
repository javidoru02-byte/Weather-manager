import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import weatherReducer from "./slices/weatherSlice";

import favouritesSlice from "./slices/favouritesSlice";

const logger = createLogger();

export default configureStore({
  reducer: {
    weatherInfo: weatherReducer,
    favouritesList: favouritesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
