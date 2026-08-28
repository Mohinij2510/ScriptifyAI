import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, FileText, Activity, Eye, Copy, Check, X, Sparkles } from "lucide-react";

export default function Dashboard() {
  const { history, fetchHistory, setScript, loading } = useStore();
  const navigate = useNavigate();
  const [selectedScript, setSelectedScript] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const stats = useMemo(() => {
    if (!history.length) return { chartData: [], total: 0 };
    
    const counts = history.reduce((acc, script) => {
      const type = script.contentType || "General";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    const chartData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    })).sort((a, b) => b.value - a.value);

    return { chartData, total: history.length };
  }, [history]);

  const handleOpenOutput = (scriptObj) => {
    if (scriptObj.generatedText) {
      setScript(scriptObj.generatedText);
      navigate("/output");
    }
  };

  const handleCopyText = (generatedText) => {
    if (!generatedText) return;
    const text = `${generatedText.title}\n\nHook: ${generatedText.hook}\n\nBody:\n${generatedText.body}\n\nDialogues:\n${generatedText.dialogues}\n\nCTA: ${generatedText.cta}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colors = ['#a855f7', '#ec4899', '#0ea5e9', '#8b5cf6', '#d946ef'];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-purple-600 font-semibold hover:text-pink-600 transition"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
          <button
            onClick={() => navigate("/generator")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold shadow-md hover:opacity-95 transition"
          >
            <Sparkles size={16} /> New Script
          </button>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
          <Activity className="text-pink-500" /> Script History & Analytics
        </h1>

        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading your script history...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Analytics Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="p-4 bg-purple-50 text-purple-500 rounded-xl"><FileText size={24} /></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Total Saved Scripts</p>
                    <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="p-4 bg-pink-50 text-pink-500 rounded-xl"><Clock size={24} /></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Top Category</p>
                    <p className="text-xl font-bold text-slate-800">{stats.chartData[0]?.name || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Categories Generated</h2>
                {stats.chartData.length > 0 ? (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.chartData}>
                        <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {stats.chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-slate-500">No scripts generated yet. Go to the Generator to create one!</p>
                )}
              </div>
            </div>

            {/* History List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[620px]">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">Your Scripts</h2>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{history.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {history.length > 0 ? history.map((item) => (
                  <div 
                    key={item._id} 
                    onClick={() => setSelectedScript(item)}
                    className="p-4 bg-slate-50 hover:bg-purple-50/60 border border-slate-100 hover:border-purple-200 rounded-2xl transition duration-200 cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md uppercase tracking-wider">
                        {item.contentType || "Script"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 mb-1 group-hover:text-purple-700 transition">
                      {item.generatedText?.title || item.topic || "Untitled Script"}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {item.generatedText?.hook || item.topic}
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 text-xs">
                      <span className="text-slate-400 font-medium">{item.duration || "60s"} • {item.tone || "Standard"}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenOutput(item); }}
                        className="text-purple-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye size={13} /> View Full
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-16 px-4">
                    <p className="text-slate-400 text-sm mb-4">No saved scripts yet.</p>
                    <button 
                      onClick={() => navigate("/generator")} 
                      className="text-purple-600 font-bold text-sm hover:underline"
                    >
                      Generate your first script →
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Script Detail Modal */}
        {selectedScript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
              
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-purple-200/60 text-purple-800 rounded-md uppercase tracking-wider">
                    {selectedScript.contentType || "Script"}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-800 mt-2">
                    {selectedScript.generatedText?.title || selectedScript.topic}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Platform: {selectedScript.platform || "Any"} • Tone: {selectedScript.tone || "Standard"} • Audience: {selectedScript.audience || "General"}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedScript(null)} 
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
                {selectedScript.generatedText ? (
                  <>
                    <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-100">
                      <h4 className="text-xs uppercase font-bold text-purple-600 tracking-wider mb-2">The Hook</h4>
                      <p className="text-base font-medium whitespace-pre-wrap">{selectedScript.generatedText.hook}</p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold text-sky-600 tracking-wider mb-2">Body Content</h4>
                      <p className="leading-relaxed whitespace-pre-wrap text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100">{selectedScript.generatedText.body}</p>
                    </div>

                    <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100">
                      <h4 className="text-xs uppercase font-bold text-pink-600 tracking-wider mb-2">Dialogues & Scene Actions</h4>
                      <p className="font-mono text-sm whitespace-pre-wrap">{selectedScript.generatedText.dialogues}</p>
                    </div>

                    <div className="bg-sky-50/60 p-5 rounded-2xl border border-sky-100">
                      <h4 className="text-xs uppercase font-bold text-sky-600 tracking-wider mb-2">Call To Action (CTA)</h4>
                      <p className="font-semibold text-slate-800">{selectedScript.generatedText.cta}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500">Script content is not available.</p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={() => handleCopyText(selectedScript.generatedText)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 font-semibold text-sm transition"
                >
                  {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy Script"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenOutput(selectedScript)}
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-sm hover:opacity-95 shadow-sm transition"
                  >
                    <Eye size={16} /> Open in Studio
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}