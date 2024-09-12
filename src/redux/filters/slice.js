import { createSlice } from "@reduxjs/toolkit";

const serchQuerySlice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    setFilters(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setFilters } = serchQuerySlice.actions;
export const filtersReducer = serchQuerySlice.reducer;
   