import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-purple-100 relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white mb-3 shadow-md">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-1">Sign in to your Scriptify-AI account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full p-3.5 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none text-slate-800 transition" 
              placeholder="you@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full p-3.5 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none text-slate-800 transition" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading} 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3.5 rounded-xl font-bold hover:opacity-95 transition shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" size={18} /> Signing In...</> : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account? <Link to="/register" className="font-bold text-pink-600 hover:text-pink-700 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
