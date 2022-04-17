import { Routes, Route, Navigate } from "react-router-dom";
import { AddHabitPage, HomePage, RegisterPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace={true} />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-habit" element={<AddHabitPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
