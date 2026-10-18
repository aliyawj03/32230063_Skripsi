import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

/**
 * App — routing utama aplikasi.
 *
 * Struktur route:
 *   /            → redirect ke /login
 *   /login       → Login (dalam AuthLayout)
 *   /register    → Register (dalam AuthLayout)
 *   /dashboard   → Dashboard (halaman mandiri)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Halaman auth di dalam AuthLayout (kartu putih tengah) */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard — halaman terpisah */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Fallback: route tidak dikenal → /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
