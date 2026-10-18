import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/global.css";

/**
 * Dashboard — halaman utama setelah login.
 * Cek sesi user; jika tidak ada, redirect ke /login.
 */
export default function Dashboard() {
  const navigate = useNavigate();

  const [username, setUsername]   = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ---- Cek sesi user saat mount ---- */
  useEffect(() => {
    async function checkUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login");
        return;
      }

      // Ambil username dari user_metadata (dikirim saat signUp)
      const meta = data.user.user_metadata as { username?: string; full_name?: string; name?: string };
      setUsername(meta.username ?? meta.full_name ?? meta.name ?? data.user.email ?? "Pengguna");
      setIsLoading(false);
    }

    checkUser();
  }, [navigate]);

  /* ---- Keluar ---- */
  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  /* ---- Tampilan loading ---- */
  if (isLoading) {
    return (
      <div style={styles.loadingWrapper}>
        <span className="spinner spinner-dark" style={{ width: 28, height: 28 }} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Ilustrasi dekoratif */}
        <div style={styles.waveBadge} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#fff">
            <path d="M3 18c2-2 4-3 6-3s4 1 6 3 4 3 6 3v-3c-2 0-4-1-6-3s-4-3-6-3-4 1-6 3v3zm0-6c2-2 4-3 6-3s4 1 6 3 4 3 6 3v-3c-2 0-4-1-6-3S9 6 7 6 5 7 3 9v3z"/>
          </svg>
        </div>

        <h1 style={styles.greeting}>Halo, {username}! 👋</h1>
        <p style={styles.subtitle}>Kamu berhasil masuk. Selamat menjelajah!</p>

        <button
          id="btn-sign-out"
          type="button"
          className="btn-secondary"
          onClick={handleSignOut}
          style={styles.signOutBtn}
        >
          ⎋ Keluar
        </button>
      </div>
    </div>
  );
}

/* Inline styles untuk dashboard (tidak memerlukan file CSS terpisah) */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    background: "radial-gradient(ellipse at 30% 70%, rgba(14,124,134,0.12) 0%, transparent 60%), #EAF6F6",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "48px 40px",
    boxShadow: "0 8px 32px rgba(14,124,134,0.12)",
    textAlign: "center" as const,
    maxWidth: 420,
    width: "100%",
    animation: "cardIn 0.35s ease both",
  },
  waveBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 16,
    background: "linear-gradient(135deg, #0E7C86, #14a3b0)",
    boxShadow: "0 4px 14px rgba(14,124,134,0.3)",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1a2e2f",
    marginBottom: 8,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b8c8d",
    marginBottom: 32,
  },
  signOutBtn: {
    margin: "0 auto",
    width: "auto",
  },
  loadingWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#EAF6F6",
  },
};
