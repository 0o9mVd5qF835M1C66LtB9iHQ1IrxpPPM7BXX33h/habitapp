import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace={true} />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
