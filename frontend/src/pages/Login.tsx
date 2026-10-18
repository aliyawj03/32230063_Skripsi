import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

/**
 * Login — halaman masuk dengan email/password atau Google OAuth.
 */
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /* ---- Login dengan email & password ---- */
  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate("/dashboard");
    }

    setIsLoading(false);
  }

  /* ---- Login dengan Google ---- */
  async function handleGoogleLogin() {
    setErrorMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
    // Jika berhasil, browser akan redirect ke Google — tidak perlu setIsLoading(false)
  }

  return (
    <>
      {/* Header kartu */}
      <div className="auth-header">
        <div className="auth-logo" aria-hidden="true">
          {/* Ikon ombak / pantai */}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18c2-2 4-3 6-3s4 1 6 3 4 3 6 3v-3c-2 0-4-1-6-3s-4-3-6-3-4 1-6 3v3zm0-6c2-2 4-3 6-3s4 1 6 3 4 3 6 3v-3c-2 0-4-1-6-3S9 6 7 6 5 7 3 9v3z"/>
          </svg>
        </div>
        <h1 className="auth-title">Selamat Datang</h1>
        <p className="auth-subtitle">Masuk ke akun kamu</p>
      </div>

      {/* Pesan error */}
      {errorMessage && (
        <div className="message-error" role="alert">
          <span>⚠</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tombol Google */}
      <button
        id="btn-google-login"
        type="button"
        className="btn-google"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        style={{ marginBottom: "4px" }}
      >
        {/* Logo Google SVG */}
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.3 0-9.7-2.9-11.3-7l-6.6 5.1C9.7 39.7 16.3 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C40.7 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
        </svg>
        Lanjut dengan Google
      </button>

      <div className="divider">atau</div>

      {/* Form email & password */}
      <form id="form-login" className="auth-form" onSubmit={handleLogin} noValidate>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="form-input"
            type="email"
            placeholder="kamu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          id="btn-login-submit"
          type="submit"
          className="btn-primary"
          disabled={isLoading}
          style={{ marginTop: "4px" }}
        >
          {isLoading ? <span className="spinner" /> : null}
          {isLoading ? "Masuk…" : "Masuk"}
        </button>
      </form>

      {/* Link ke Register */}
      <p className="auth-footer">
        Belum punya akun?{" "}
        <Link to="/register">Daftar sekarang</Link>
      </p>
    </>
  );
}
