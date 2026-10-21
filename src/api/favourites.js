import httpClient from "./httpClient";

export const fetchFavourites = () => httpClient.get("/favourites");

export const createFavourite = (favourite) =>
  httpClient.post("/favourites", favourite);

export const removeFavourite = (cityId) =>
  httpClient.delete(`/favourites/${cityId}`);