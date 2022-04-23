import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {} from "../../../generated/api";

export type HomeState = {
  selectedDay: number;
};

export const initialState: HomeState = {
  selectedDay: Date.now(),
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
  },
});
