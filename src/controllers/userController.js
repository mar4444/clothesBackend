import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user exists
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 3. Insert user
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    // 4. Hide password in response
    const { password: pw, ...userData } = user.dataValues;

    res.status(201).json({
      message: "User created successfully",
      user: userData,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
