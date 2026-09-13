import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import weatherReducer from "./slices/weatherSlice";
import favouritesSlice from "./slices/favouritesSlice";
import authSlice, { validateToken } from "./slices/authSlice";

const logger = createLogger();

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favouritesList: favouritesSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

if (localStorage.getItem("token")) {
  store.dispatch(validateToken());
}

export default store;