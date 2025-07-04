import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Authorization token missing" });
  }
};
