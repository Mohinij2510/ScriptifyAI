import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Sparkles, LogOut, LayoutDashboard } from "lucide-react";

const categories = [
  { name: "Movie Script", icon: "🎬" },
  { name: "Stand-up Comedy", icon: "🎤" },
  { name: "Instagram Reel", icon: "📱" },
  { name: "Brand Ad", icon: "🛍️" },
  { name: "Role Play", icon: "🎭" },
  { name: "Song", icon: "🎵" },
  { name: "Speech", icon: "🗣️" },
  { name: "Storytelling", icon: "📚" }
];

export default function Home() {
  const navigate = useNavigate();
  const { user, logout, updateForm } = useStore();

  const handleCategoryClick = (category) => {
    updateForm({ contentType: category });
    navigate("/generator");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-sky-50 text-slate-800 p-6 md:p-10 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-2 text-purple-600 font-bold text-xl">
          <Sparkles className="text-pink-500" /> Scriptify AI
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 hidden md:block">Welcome, {user?.name}</span>
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white rounded-full text-purple-600 font-medium transition shadow-sm border border-purple-100">
            <LayoutDashboard size={16} /> Dashboard
          </button>
          <button onClick={() => { logout(); navigate("/login"); }} className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white rounded-full text-red-500 font-medium transition shadow-sm border border-red-50">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 leading-tight">
          Create Scripts with AI ✨
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
          Movies, Reels, Ads, Speeches — generate compelling, ready-to-use scripts in seconds. Choose a category below to start writing.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className="group p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition duration-300 flex flex-col items-center justify-center gap-3"
          >
            <span className="text-4xl group-hover:scale-110 transition duration-300">{cat.icon}</span>
            <span className="font-semibold text-slate-700 text-center">{cat.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}