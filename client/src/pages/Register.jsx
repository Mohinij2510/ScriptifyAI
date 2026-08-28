import { useState } from "react";
import { useStore } from "../store/useStore";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, ArrowRight, Loader2 } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-pink-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-pink-100 relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 text-white mb-3 shadow-md">
            <UserPlus size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Create Account</h2>
          <p className="text-slate-500 text-sm mt-1">Get started with Scriptify-AI</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              className="w-full p-3.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-slate-800 transition" 
              placeholder="Your Name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full p-3.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-slate-800 transition" 
              placeholder="you@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Number</label>
            <input 
              type="text" 
              required 
              className="w-full p-3.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-slate-800 transition" 
              placeholder="+1234567890"
              value={contact} 
              onChange={(e) => setContact(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full p-3.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-slate-800 transition" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading} 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3.5 rounded-xl font-bold hover:opacity-95 transition shadow-lg shadow-pink-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" size={18} /> Creating Account...</> : <>Sign Up <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
