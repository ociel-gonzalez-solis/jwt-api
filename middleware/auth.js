const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../errors");

const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new Unauthorized("No authorized to access to this route");
  }
};

module.exports = authorizationMiddleware;
