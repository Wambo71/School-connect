import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Courses from "./pages/Courses";
import Departments from "./pages/Departments";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= PROTECTED ROUTES ================= */}

      {/* DASHBOARD - ALL LOGGED IN USERS */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* STUDENTS - ADMIN + STAFF */}
      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <Students />
          </ProtectedRoute>
        }
      />

      {/* COURSES - ADMIN + STAFF */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute allowedRoles={["admin", "staff"]}>
            <Courses />
          </ProtectedRoute>
        }
      />

      {/* STAFF - ADMIN ONLY */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Staff />
          </ProtectedRoute>
        }
      />

      {/* DEPARTMENTS - ADMIN ONLY */}
      <Route
        path="/departments"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Departments />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;