import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/UserService"; // make sure this points to the Render backend
import { useAuth } from "../context/AuthContext.jsx";

// Add your Render backend URL here
const API_BASE_URL = "https://bernardo-server.onrender.com/api"; // <-- your Render backend URL

function SignInPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Make sure loginUser uses the Render URL
      const res = await loginUser({ email: form.email, password: form.password }, API_BASE_URL);

      if (res.data && res.data.loginSuccessful) {
        // Store user info and role
        login({
          email: res.data.email,
          name: res.data.name,
          role: res.data.role || res.data.type || "user",
        });

        // Redirect based on role
        if ((res.data.role || res.data.type) === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid credentials or user does not exist.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials or user does not exist."
      );
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Access your account to manage orders, saved builds, and premium carbon fiber drops."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/55 outline-none transition focus:border-cyan-300/80 focus:bg-white/14 focus:ring-2 focus:ring-cyan-300/30"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/55 outline-none transition focus:border-cyan-300/80 focus:bg-white/14 focus:ring-2 focus:ring-cyan-300/30"
          required
        />

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Login
        </button>

        <p className="pt-2 text-center text-sm text-white/70">
          Secure access for members and returning customers.
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignInPage;