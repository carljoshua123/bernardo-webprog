import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            src="/src/assets/image.png" 
            alt="Wet Carbon Logo" 
            className="w-12 h-12 object-cover rounded-lg border border-zinc-800 shadow-lg" 
          />
          <span className="font-bold text-xl tracking-tight text-zinc-100">
            Wet Carbon
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-bold text-zinc-400">
          <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-500 transition-colors">About</Link>
          <Link to="/articles" className="hover:text-blue-500 transition-colors">Articles</Link>

          {/* ✅ NEW AUTH LINKS */}
          <Link to="/signin" className="hover:text-green-400 transition-colors">
            Sign In
          </Link>

          <Link 
            to="/signup" 
            className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}