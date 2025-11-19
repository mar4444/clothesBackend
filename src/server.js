import express from "express";
import sequelize from "./config/db.js";
import authRoute from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/login.js";
import authPost from "./routes/post.js";

const app = express();
app.use(express.json());

// Routes
app.use("/api", authRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/", authPost);

const PORT = process.env.PORT || 5000;

// Database connection
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync();
    console.log("Models synced!");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

start();

