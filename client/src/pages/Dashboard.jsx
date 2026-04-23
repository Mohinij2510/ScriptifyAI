import { useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, FileText, Activity } from "lucide-react";

export default function Dashboard() {
  const { history, fetchHistory, loading } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const stats = useMemo(() => {
    if (!history.length) return { chartData: [], total: 0 };
    
    const counts = history.reduce((acc, script) => {
      acc[script.contentType] = (acc[script.contentType] || 0) + 1;
      return acc;
    }, {});
    
    const chartData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    })).sort((a, b) => b.value - a.value);

    return { chartData, total: history.length };
  }, [history]);

  const colors = ['#a855f7', '#ec4899', '#0ea5e9', '#8b5cf6', '#d946ef'];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-purple-600 font-semibold hover:text-pink-600 transition mb-8"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
          <Activity className="text-pink-500" /> Dashboard
        </h1>

        {loading ? (
          <p className="text-slate-500">Loading your data...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Analytics Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="p-4 bg-purple-50 text-purple-500 rounded-xl"><FileText size={24} /></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Total Scripts Generated</p>
                    <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="p-4 bg-pink-50 text-pink-500 rounded-xl"><Clock size={24} /></div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Most Used Type</p>
                    <p className="text-xl font-bold text-slate-800">{stats.chartData[0]?.name || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Content Types Usage</h2>
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
                  <p className="text-slate-500">No data to display yet.</p>
                )}
              </div>
            </div>

            {/* History List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[600px] flex flex-col">
              <h2 className="text-xl font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Recent History</h2>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {history.length > 0 ? history.map((item) => (
                  <div key={item._id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2 py-1 bg-purple-100 text-purple-600 rounded-md uppercase tracking-wider">{item.contentType}</span>
                      <span className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">{item.topic}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{item.generatedText?.hook}</p>
                  </div>
                )) : (
                  <p className="text-slate-500 text-sm">You haven't saved any scripts yet.</p>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}