import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegin } from "store/api";

const users = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: {},
  },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },
    apiRequestSuccess: (users, action) => {
      users.list = action.payload;
      users.loading = false;
    },
    apiRequestFailed: (users, action) => {
      users.error = action.payload;
      users.loading = false;
    },
  },
});

export const { usersRequested, apiRequestSuccess, apiRequestFailed } =
  users.actions;
export default users.reducer;

export const loadUsers = () =>
  apiCallBegin({
    url: "/users",
    onStart: usersRequested.type,
    onSuccess: apiRequestSuccess.type,
    onError: apiRequestFailed.type,
  });

export const getUsers = (state) => state.entities.users.list;
