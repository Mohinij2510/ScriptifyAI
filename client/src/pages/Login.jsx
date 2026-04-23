import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 flex items-center justify-center p-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-100">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">Email</label>
            <input type="email" required className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-1">Password</label>
            <input type="password" required className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-purple-600">
          Don't have an account? <Link to="/register" className="font-bold text-pink-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
