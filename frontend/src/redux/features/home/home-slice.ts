import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CompletedDateControllerFindAllByRangeParams,
  getCompletedDateControllerFindAllByRangeQueryKey,
} from "../../../generated/api";

export type HomeState = {
  selectedDay: number;
  completedDatesQueryKey: (
    | string
    | CompletedDateControllerFindAllByRangeParams
  )[];
};

export const initialState: HomeState = {
  selectedDay: Date.now(),
  completedDatesQueryKey: getCompletedDateControllerFindAllByRangeQueryKey(),
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
    setCompletedDatesQueryKey: (
      state,
      action: PayloadAction<
        (string | CompletedDateControllerFindAllByRangeParams)[]
      >
    ) => {
      state.completedDatesQueryKey = action.payload;
    },
  },
});
