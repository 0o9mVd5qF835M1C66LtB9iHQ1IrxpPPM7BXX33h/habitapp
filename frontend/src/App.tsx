import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { AddHabitPage, HomePage, LoginPage, RegisterPage } from "./pages";
import theme from "./theme";
import { store } from "./redux";
import { Auth } from "./Auth";
import axios from "axios";

dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const queryClient = new QueryClient();
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Auth>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
              />
              <Route path="/home" element={<HomePage />} />
              <Route path="/add-habit" element={<AddHabitPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Auth>
        </ChakraProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
