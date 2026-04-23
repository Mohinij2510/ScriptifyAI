import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, loading } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, contact, password);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-pink-50 to-purple-50 flex items-center justify-center p-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-pink-100">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Create Account</h2>
        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-pink-900 mb-1">Name</label>
            <input type="text" required className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-900 mb-1">Email</label>
            <input type="email" required className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-900 mb-1">Contact</label>
            <input type="text" required className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none" value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-900 mb-1">Password</label>
            <input type="password" required className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-pink-600">
          Already have an account? <Link to="/login" className="font-bold text-purple-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
