import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function SignInPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate successful sign in
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Access your account to manage orders, saved builds, and premium carbon fiber drops."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/55 outline-none transition focus:border-cyan-300/80 focus:bg-white/14 focus:ring-2 focus:ring-cyan-300/30"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/55 outline-none transition focus:border-cyan-300/80 focus:bg-white/14 focus:ring-2 focus:ring-cyan-300/30"
        />

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