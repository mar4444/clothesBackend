import express from "express";
import { registerUser } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

export default router;

