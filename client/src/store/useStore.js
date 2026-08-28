import { create } from "zustand";
import axios from "axios";

const API_URL = "/api";

export const useStore = create((set, get) => ({
  step: 1,
  form: {
    contentType: "",
    tone: "",
    audience: "",
    topic: "",
    platform: "",
    duration: "",
    characters: ""
  },
  script: null,
  history: [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  setStep: (step) => set({ step }),
  setScript: (script) => set({ script }),

  updateForm: (data) =>
    set((state) => ({
      form: { ...state.form, ...data }
    })),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      set({ user: res.data, token: res.data.token, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  register: async (name, email, contact, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { name, email, contact, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      set({ user: res.data, token: res.data.token, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, history: [], script: null });
  },

  generateScript: async () => {
    set({ loading: true, error: null });
    try {
      const { form, token } = get();
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const res = await axios.post(`${API_URL}/scripts/generate`, form, config);
      set({ script: res.data.generatedText, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  saveScript: async () => {
    set({ loading: true, error: null });
    try {
      const { form, script, token } = get();
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`${API_URL}/scripts/save`, { ...form, generatedText: script }, config);
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
      return false;
    }
  },

  fetchHistory: async () => {
    set({ loading: true, error: null });
    try {
      const { token } = get();
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${API_URL}/scripts/history`, config);
      set({ history: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  }
}));
