import { configureStore } from "@reduxjs/toolkit";
import { homeReducer, userReducer } from "./features";

export const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
