import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import weatherReducer from "./slices/weatherSlice";
import favouritesSlice from "./slices/favouritesSlice";
import authSlice from "./slices/authSlice";

export default configureStore({
  reducer: {
    weather: weatherReducer,
    favouritesList: favouritesSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();

    if (import.meta.env.DEV) {
      middleware.push(createLogger());
    }

    return middleware;
  },
});
