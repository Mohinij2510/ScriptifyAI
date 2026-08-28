import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Fallback in-memory user registry (used when MongoDB is not connected)
const memoryUsers = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanContact = (contact || "").trim();

    // Try MongoDB if connected
    if (isDbConnected()) {
      const query = cleanContact 
        ? { $or: [{ email: normalizedEmail }, { contact: cleanContact }] }
        : { email: normalizedEmail };
        
      const userExists = await User.findOne(query);

      if (userExists) {
        return res.status(400).json({ message: "User with this email or contact already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        contact: cleanContact,
        password: hashedPassword,
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        token: generateToken(user._id),
      });
    }

    // Fallback: in-memory store
    const existing = memoryUsers.find(
      u => u.email === normalizedEmail || (cleanContact && u.contact === cleanContact)
    );
    if (existing) {
      return res.status(400).json({ message: "User with this email or contact already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      _id: "user_" + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      contact: cleanContact,
      passwordHash: hashedPassword,
    };
    memoryUsers.push(newUser);

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      contact: newUser.contact,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Try MongoDB if connected
    if (isDbConnected()) {
      const user = await User.findOne({ email: normalizedEmail });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        token: generateToken(user._id),
      });
    }

    // Fallback: in-memory store
    const user = memoryUsers.find(u => u.email === normalizedEmail);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password. Please sign up first." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Login failed" });
  }
};
