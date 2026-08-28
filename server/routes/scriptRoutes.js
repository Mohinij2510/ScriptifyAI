import express from "express";
import { generateScript, saveScript, getHistory } from "../controllers/scriptController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", generateScript);
router.post("/save", protect, saveScript);
router.get("/history", protect, getHistory);

export default router;