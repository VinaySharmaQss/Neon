import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../utils/db.js";

const auth = asyncHandler(async (req, res, next) => {
  try {
    // Log headers and cookies for debugging
    console.log("Request Headers:", req.headers);
    console.log("Cookies:", req.cookies);

    // Extract token from cookies
    const token = req.cookies && req.cookies.accessToken;
    console.log("Extracted Token:", token);

    if (!token) {
      return next(new ApiError(401, "Invalid token: No token provided"));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Find user by decoded token id
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return next(new ApiError(401, "Invalid token: User not found"));
    }

    // Attach user to request object for later use
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired"));
    } else if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token"));
    } else {
      return next(new ApiError(500, "Internal server error"));
    }
  }
});

export default auth;
