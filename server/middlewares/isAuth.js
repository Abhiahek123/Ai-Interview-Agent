import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // Check cookie first, then Authorization header
    let token = req.cookies?.token;

    // If no cookie token, check Authorization header (Bearer token)
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = verifyToken.userId;

    next();

  } catch (error) {
    return res.status(500).json({ message: `isAuth error ${error}` });
  }
};

export default isAuth;