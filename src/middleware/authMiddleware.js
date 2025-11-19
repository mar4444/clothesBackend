import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  // Read token from header: auth-token
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to request
    req.user = verified;

    next(); // Continue to protected route
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
