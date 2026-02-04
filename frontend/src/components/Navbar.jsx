import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-400" />
          <span className=" text-2xl text-blue-400 tracking-wide">
            NoteKeeper
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/" ? "text-blue-400 font-semibold" : "text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/create" ? "text-blue-400 font-semibold" : "text-gray-300"
            }`}
          >
            Create Note
          </Link>
          {!currentUser ? (
            <>
              <Link
                to="/login"
                className={`hover:text-blue-400 transition ${
                  location.pathname === "/login" ? "text-blue-400 font-semibold" : "text-gray-300"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`hover:text-blue-400 transition ${
                  location.pathname === "/signup" ? "text-blue-400 font-semibold" : "text-gray-300"
                }`}
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-blue-400/60 px-3 py-1 text-sm text-blue-200 transition hover:border-blue-400 hover:text-blue-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
