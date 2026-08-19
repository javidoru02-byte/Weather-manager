import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

const logger = createLogger();

import weatherReducer from "./slices/weatherSlice";

export default configureStore({
  reducer: {
    weatherInfo: weatherReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
