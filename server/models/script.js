import mongoose from "mongoose";

const scriptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contentType: String,
  tone: String,
  audience: String,
  topic: String,
  platform: String,
  duration: String,
  characters: String,
  generatedText: Object
}, { timestamps: true });

export default mongoose.model("Script", scriptSchema);