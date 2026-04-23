import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Generator from "./pages/Generator";
import Output from "./pages/Output";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useStore } from "./store/useStore";
import FloatingChat from "./components/chat/FloatingChat";

const ProtectedRoute = ({ children }) => {
  const { user } = useStore();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/generator" element={<ProtectedRoute><Generator /></ProtectedRoute>} />
          <Route path="/output" element={<ProtectedRoute><Output /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
        <FloatingChat />
      </div>
    </BrowserRouter>
  );
}

export default App;