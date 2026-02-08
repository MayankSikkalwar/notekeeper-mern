import { Link, NavLink } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = () => {
    const base = currentUser?.displayName || currentUser?.email || "";
    if (!base) return "NK";
    return base
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const navLinkStyles = ({ isActive }) =>
    [
      "rounded-lg px-3 py-1.5 text-sm transition",
      isActive
        ? "bg-white/10 text-white shadow-sm"
        : "text-slate-300 hover:bg-white/5 hover:text-white",
    ].join(" ");

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg tracking-wide text-slate-100">
              NoteKeeper
            </p>
            <p className="text-xs text-slate-400">Keep ideas flowing</p>
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-3">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/create" className={navLinkStyles}>
            Create Note
          </NavLink>
          {!currentUser ? (
            <>
              <NavLink to="/login" className={navLinkStyles}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkStyles}>
                Signup
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-100">
                    {getInitials()}
                  </div>
                )}
                <span className="hidden text-xs text-slate-300 sm:inline">
                  {currentUser?.displayName || currentUser?.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
