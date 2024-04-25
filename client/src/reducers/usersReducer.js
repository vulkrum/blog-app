import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const { setUsers } = usersReducer.actions;

export const initialiseUsers = () => {
  return async (dispatch) => {
    dispatch(setUsers(await userService.getAll()));
  };
};

export default usersReducer.reducer;
