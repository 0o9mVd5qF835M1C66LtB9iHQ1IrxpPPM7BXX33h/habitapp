import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import {} from "../../../generated/api";

export type HomeState = {
  selectedDay: Dayjs;
};

export const initialState: HomeState = {
  selectedDay: dayjs(),
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<Dayjs>) => {
      state.selectedDay = action.payload;
    },
  },
});
