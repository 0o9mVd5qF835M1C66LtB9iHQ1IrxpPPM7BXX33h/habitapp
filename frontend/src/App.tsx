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
import { userTokenKey } from "./constants";

dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

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
                path="/"
                element={<Navigate to="/home" replace={true} />}
              />
              <Route path="/home" element={<HomePage />} />
              <Route path="/habits/:habitId" element={<HabitPage />} />
              <Route path="/add-habit" element={<AddHabitPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
