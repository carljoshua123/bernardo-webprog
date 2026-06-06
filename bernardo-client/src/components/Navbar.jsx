import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logoImage from "../assets/image.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            src={logoImage} 
            alt="Wet Carbon Logo" 
            className="w-12 h-12 object-cover rounded-lg border border-zinc-800 shadow-lg" 
          />
          <span className="font-bold text-xl tracking-tight text-zinc-100">
            Wet Carbon
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-bold text-zinc-400">
          {/* Show Home/About/Articles only if logged in and not admin */}
          {user && user.role !== "admin" && (
            <>
              <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-blue-500 transition-colors">About</Link>
              <Link to="/articles" className="hover:text-blue-500 transition-colors">Articles</Link>
            </>
          )}

          {/* Show Admin Panel link if admin */}
          {user && user.role === "admin" && (
            <Link to="/dashboard" className="hover:text-red-400 transition-colors">Admin Panel</Link>
          )}

          {/* Show Sign In/Sign Up if not logged in */}
          {!user && (
            <>
              <Link to="/signin" className="hover:text-green-400 transition-colors">Sign In</Link>
              <Link 
                to="/signup" 
                className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Show Logout if logged in */}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}