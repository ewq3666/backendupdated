const jwt = require("jsonwebtoken");
exports.isUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    // If the token is missing, return an "Invalid user" response
    return res.status(401).json({ message: "Invalid user" });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid user" });
    }

    req.user = decoded;

    next();
  });
};
