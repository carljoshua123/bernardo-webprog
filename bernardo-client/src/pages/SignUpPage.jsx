import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import { createUser } from "../services/UserService";

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    contactNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const names = form.fullName.trim().split(" ");
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || "User";

      const newUser = {
        firstName,
        lastName,
        age: "18",
        gender: "Other",
        contactNumber: form.contactNumber,
        email: form.email,
        type: "editor",
        username: form.username,
        password: form.password,
        address: form.address,
        isActive: true,
      };

      await createUser(newUser);

      alert("Account created successfully!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/55 outline-none transition focus:border-cyan-300/80 focus:bg-white/14 focus:ring-2 focus:ring-cyan-300/30";

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Wet Carbon community and track the latest parts, releases, and rider updates."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="contactNumber"
          type="text"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="address"
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="pt-2 text-center text-sm text-white/70">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Sign in
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignUpPage;