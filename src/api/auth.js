import httpClient from "./httpClient";

export const registerRequest = (payload) => httpClient.post("/users", payload);

export const loginRequest = (payload) => httpClient.post("/users/login", payload);

export const changePasswordRequest = (payload) =>
  httpClient.patch("/users/me/password", payload);

export const updateUserRequest = (payload) =>
  httpClient.patch("/users/me", payload);