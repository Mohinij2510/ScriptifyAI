import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-lg p-4">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">Chat here...</div>
            <input className="border p-2 mt-2" placeholder="Ask AI..." />
          </div>
        </div>
      )}
    </>
  );
}