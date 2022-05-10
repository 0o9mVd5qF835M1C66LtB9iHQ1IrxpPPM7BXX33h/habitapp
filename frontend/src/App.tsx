import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import axios from "axios";

import {
  AddHabitPage,
  HomePage,
  LoginPage,
  RegisterPage,
  HabitPage,
} from "./pages";
import theme from "./theme";
import { store } from "./redux";
import { AuthProvider } from "./AuthProvider";
import { AppRoutes, userTokenKey } from "./constants";
import { EditHabitPage } from "./pages/edit-habit";
import { WithHabitFromURLParams } from "./components/with-habit-from-url-params";

dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const queryClient = new QueryClient();

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use((config) => {
  config.headers = {
    ...(config.headers ? config.headers : {}),
    authorization: `Bearer ${localStorage.getItem(userTokenKey)}`,
  };

  return config;
});

function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <Routes>
              <Route
                path={AppRoutes.ROOT}
                element={<Navigate to={AppRoutes.HOME} replace={true} />}
              />
              <Route path={AppRoutes.HOME} element={<HomePage />} />
              <Route
                path={AppRoutes.HABIT}
                element={
                  <WithHabitFromURLParams
                    render={(habit) => <HabitPage habit={habit} />}
                  />
                }
              />
              <Route
                path={AppRoutes.EDIT_HABIT}
                element={
                  <WithHabitFromURLParams
                    render={(habit) => <EditHabitPage editingHabit={habit} />}
                  />
                }
              />
              <Route path={AppRoutes.ADD_HABIT} element={<AddHabitPage />} />
              <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
              <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
