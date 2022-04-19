import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HomeState = {
  selectedDate: number;
};

export const initialState: HomeState = {
  selectedDate: Date.now(),
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<number>) => {
      state.selectedDate = action.payload;
    },
  },
});
