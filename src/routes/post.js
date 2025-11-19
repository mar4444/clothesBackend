import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/post", authenticate, async (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

export default router;
