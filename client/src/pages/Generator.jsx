import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";

export default function Generator() {
  const { step, setStep, form, updateForm, generateScript, loading, error } = useStore();
  const navigate = useNavigate();

  const handleNext = () => setStep(Math.min(step + 1, 5));
  const handleBack = () => setStep(Math.max(step - 1, 1));

  const handleGenerate = async () => {
    const success = await generateScript();
    if (success) {
      setStep(1); // reset for future
      navigate("/output");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold text-purple-800">What do you want to write?</h2>
            <p className="text-slate-500">e.g., Movie Script, Instagram Reel, Brand Ad</p>
            <input 
              type="text" 
              value={form.contentType} 
              onChange={(e) => updateForm({ contentType: e.target.value })}
              className="w-full p-4 rounded-xl border border-purple-200 focus:ring-2 focus:ring-pink-400 outline-none shadow-inner"
              placeholder="Enter content type..."
              autoFocus
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold text-pink-700">What's the tone?</h2>
            <p className="text-slate-500">e.g., Funny, Professional, Dramatic, Educational</p>
            <input 
              type="text" 
              value={form.tone} 
              onChange={(e) => updateForm({ tone: e.target.value })}
              className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-purple-400 outline-none shadow-inner"
              placeholder="Enter tone..."
              autoFocus
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold text-sky-700">Who is the audience?</h2>
            <p className="text-slate-500">e.g., Teenagers, Tech Enthusiasts, Small Business Owners</p>
            <input 
              type="text" 
              value={form.audience} 
              onChange={(e) => updateForm({ audience: e.target.value })}
              className="w-full p-4 rounded-xl border border-sky-200 focus:ring-2 focus:ring-sky-400 outline-none shadow-inner"
              placeholder="Enter audience..."
              autoFocus
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold text-purple-800">What is the topic?</h2>
            <p className="text-slate-500">Describe what the script is about in a few sentences.</p>
            <textarea 
              value={form.topic} 
              onChange={(e) => updateForm({ topic: e.target.value })}
              className="w-full p-4 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-400 outline-none shadow-inner h-32 resize-none"
              placeholder="Enter topic..."
              autoFocus
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold text-pink-700">Optional Details</h2>
            <p className="text-slate-500">Add any specific constraints for your script.</p>
            <div className="space-y-4">
              <input 
                type="text" 
                value={form.platform} 
                onChange={(e) => updateForm({ platform: e.target.value })}
                className="w-full p-3 rounded-xl border border-pink-100 focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Platform (e.g., TikTok, YouTube)"
              />
              <input 
                type="text" 
                value={form.duration} 
                onChange={(e) => updateForm({ duration: e.target.value })}
                className="w-full p-3 rounded-xl border border-pink-100 focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Duration (e.g., 60 seconds, 5 minutes)"
              />
              <input 
                type="text" 
                value={form.characters} 
                onChange={(e) => updateForm({ characters: e.target.value })}
                className="w-full p-3 rounded-xl border border-pink-100 focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Number of characters/performers (e.g., 2, 5, Solo)"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      
      {/* Home Button */}
      <button 
        onClick={() => { setStep(1); navigate("/"); }}
        className="absolute top-6 left-6 text-purple-600 font-semibold hover:text-pink-600 transition"
      >
        ← Back to Home
      </button>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-2xl border border-white relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }}></div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-8 text-sm font-medium text-slate-400">
          <span>Step {step} of 5</span>
          <span className="text-purple-600 flex items-center gap-1"><Sparkles size={14}/> Scriptify Magic</span>
        </div>

        {error && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}

        {/* Wizard Content */}
        <div className="min-h-[200px]">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
          <button 
            onClick={handleBack} 
            disabled={step === 1 || loading}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition disabled:opacity-30"
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          {step < 5 ? (
            <button 
              onClick={handleNext} 
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition font-medium shadow-md hover:shadow-lg"
            >
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleGenerate} 
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition font-bold shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {loading ? <><Loader2 className="animate-spin" size={18} /> Generating...</> : <><Sparkles size={18} /> Generate Script</>}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}