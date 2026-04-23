import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! Need help writing your script?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, newMsg]);
    setInput("");
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I'm a simulated assistant! I can help you brainstorm ideas.", 
        sender: "ai" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 rounded-2xl shadow-2xl overflow-hidden border border-pink-100 flex flex-col h-96">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.sender === "user" ? "bg-purple-500 text-white rounded-br-none" : "bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input 
              type="text" 
              className="flex-1 p-2 rounded-lg bg-gray-50 border border-gray-100 outline-none focus:ring-1 focus:ring-pink-400 text-sm"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="p-2 text-pink-500 hover:text-purple-600 transition">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
