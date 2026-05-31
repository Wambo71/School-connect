import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Courses from "./pages/Courses";
import Departments from "./pages/Departments";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/students" element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        } />

        <Route path="/staff" element={
          <ProtectedRoute>
            <Staff />
          </ProtectedRoute>
        } />

        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />

        <Route path="/departments" element={
          <ProtectedRoute>
            <Departments />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;