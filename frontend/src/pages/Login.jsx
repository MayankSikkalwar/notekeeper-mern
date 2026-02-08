import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Failed to log in. Check credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="glass-card w-full max-w-md rounded-2xl p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Welcome back
        </p>
        <h2 className="font-display text-2xl text-white mb-2">Login</h2>
        <p className="text-sm text-slate-400 mb-6">
          Pick up right where you left off.
        </p>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-full bg-sky-500 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 rounded-full border border-white/10 bg-white/5 py-2 text-sm text-slate-100 transition hover:bg-white/10"
        >
          Continue with Google
        </button>

        <p className="text-slate-400 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-sky-300 hover:text-sky-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
