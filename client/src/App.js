import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/CustomRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
