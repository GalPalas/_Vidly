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
    apiRequestSuccess: (users, action) => {
      users.list = action.payload;
    },
    apiRequestFailed: (users, action) => {
      users.error = action.payload;
    },
  },
});

export const { apiRequestSuccess, apiRequestFailed } = users.actions;
export default users.reducer;

export const loadUsers = () =>
  apiCallBegin({
    url: "/users",
    onSuccess: apiRequestSuccess.type,
    onError: apiRequestFailed.type,
  });

export const getUsers = (state) => state.entities.users.list;
