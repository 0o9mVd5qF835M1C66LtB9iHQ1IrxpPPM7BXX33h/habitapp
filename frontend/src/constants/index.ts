export enum AppRoutes {
  ROOT = "/",
  HOME = "/home",
  HABIT = "/habits/:habitId",
  EDIT_HABIT = "/habits/:habitId/edit",
  ADD_HABIT = "/add-habit",
  REGISTER = "/register",
  LOGIN = "/login",
}

export const isoWeekdays = [1, 2, 3, 4, 5, 6, 7];
export const userTokenKey = "userToken";
