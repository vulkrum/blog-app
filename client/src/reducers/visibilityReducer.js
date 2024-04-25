import { createSlice } from "@reduxjs/toolkit";

const visibilityReducer = createSlice({
  name: "visibility",
  initialState: false,
  reducers: {
    toggleVisibility: (state) => !state,
  },
});

export const { toggleVisibility } = visibilityReducer.actions;

export default visibilityReducer.reducer;
