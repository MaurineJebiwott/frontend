import { Routes, Route, Navigate } from "react-router-dom"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContractsDashboard from "./pages/ContractsDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Redirect root ("/") to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Single Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ContractsDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
