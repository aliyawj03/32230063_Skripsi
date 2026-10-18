import { Outlet } from "react-router-dom";
import "../styles/global.css";
import "../styles/auth.css";

/**
 * AuthLayout — membungkus halaman Login dan Register.
 * Menampilkan kartu putih di tengah layar berlatar teal.
 */
export default function AuthLayout() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Outlet />
      </div>
    </div>
  );
}
