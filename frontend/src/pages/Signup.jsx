import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await signup(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to create account.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError("Google signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="glass-card w-full max-w-md rounded-2xl p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Start here
        </p>
        <h2 className="font-display text-2xl text-white mb-2">Sign Up</h2>
        <p className="text-sm text-slate-400 mb-6">
          Create a space for your best ideas.
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

          <button className="w-full rounded-full bg-emerald-400 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full mt-4 rounded-full border border-white/10 bg-white/5 py-2 text-sm text-slate-100 transition hover:bg-white/10"
        >
          Sign up with Google
        </button>

        <p className="text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-300 hover:text-sky-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
