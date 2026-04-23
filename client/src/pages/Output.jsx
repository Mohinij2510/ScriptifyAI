import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { Copy, Save, RefreshCw, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

export default function Output() {
  const { script, saveScript, generateScript, loading } = useStore();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!script) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-pink-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No script generated yet.</p>
          <button onClick={() => navigate("/generator")} className="text-purple-600 font-bold hover:underline">Go to Generator</button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    const text = `${script.title}\n\nHook: ${script.hook}\n\nBody:\n${script.body}\n\nDialogues:\n${script.dialogues}\n\nCTA: ${script.cta}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    const success = await saveScript();
    if (success) setSaved(true);
  };

  const handleRegenerate = async () => {
    setSaved(false);
    await generateScript();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-sky-50 to-pink-50 p-6 md:p-10">
      
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-purple-600 font-semibold hover:text-pink-600 transition mb-8"
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Your Generated Script
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-100 rounded-lg text-purple-700 hover:bg-purple-50 transition shadow-sm"
            >
              {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
            </button>
            <button 
              onClick={handleRegenerate}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-sky-100 rounded-lg text-sky-700 hover:bg-sky-50 transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Regenerate
            </button>
            <button 
              onClick={handleSave}
              disabled={saved || loading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition shadow-md disabled:opacity-50"
            >
              {saved ? <Check size={16} /> : <Save size={16} />} {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white p-8 md:p-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 border-b border-purple-100 pb-4 mb-4">{script.title}</h2>
          </div>

          <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-xs uppercase tracking-wider font-bold text-purple-400 mb-2">The Hook</h3>
            <p className="text-slate-700 text-lg">{script.hook}</p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-sky-400 mb-2">Body</h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{script.body}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs uppercase tracking-wider font-bold text-pink-400 mb-2">Dialogues</h3>
            <p className="text-slate-700 font-mono text-sm whitespace-pre-wrap">{script.dialogues}</p>
          </div>

          <div className="bg-sky-50/50 p-6 rounded-xl border border-sky-100">
            <h3 className="text-xs uppercase tracking-wider font-bold text-sky-500 mb-2">Call to Action</h3>
            <p className="text-slate-800 font-medium">{script.cta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}