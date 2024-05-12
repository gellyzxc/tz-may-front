import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./screens/Homepage";
import { useAuth } from "./providers/AuthProvider";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage></Homepage>} />
      <Route
        path="/home"
        element={
          <ProtectedRoute redirect={"/"}>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

const ProtectedRoute = ({ children, redirect }) => {
  const { user } = useAuth();

  return !!user ? children : <Navigate to={redirect} />;
};

export default App;
