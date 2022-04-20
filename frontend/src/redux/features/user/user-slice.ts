import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../../generated/api";

export type UserState = {
  current?: User;
};

const initialState: UserState = {
  current: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
    },
    removeCurrentUser: (state) => {
      state.current = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, removeCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
