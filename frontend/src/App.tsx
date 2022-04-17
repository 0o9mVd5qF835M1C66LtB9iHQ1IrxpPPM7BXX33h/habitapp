import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { AddHabitPage, HomePage, RegisterPage } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-habit" element={<AddHabitPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
