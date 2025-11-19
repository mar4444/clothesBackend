import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

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
