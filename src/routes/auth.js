import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res.send("Registered");
});

export default router;
