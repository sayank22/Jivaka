require("dotenv").config();
const { verifyToken } = require("@clerk/backend");

const verifyClerkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const userId = payload.sub;
    const email =
      payload.email || (payload.email_addresses && payload.email_addresses[0]);
    const name =
      payload.name ||
      `${payload.first_name || ""} ${payload.last_name || ""}`.trim();

    req.user = {
      id: userId,
      email,
      name: name || "Unknown",
    };

    next();
  } catch (err) {
    console.error("🔒 Clerk verification failed:", err.message);
    return res
      .status(401)
      .json({ message: "Unauthorized. Invalid or expired token." });
  }
};

module.exports = verifyClerkToken;
