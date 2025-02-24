import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../utils/db.js";

const auth = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");
    console.log("Token:", token);

   
    if (!token) {
      throw new ApiError(401, "Invalid token");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        // Add any other fields you need, but leave out password & refreshToken
      },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Pass control to the next middleware/route handler
    next();
  } catch (error) {
    // Handle errors accordingly
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token");
    } else {
      throw new ApiError(500, "Internal server error");
    }
  }
});

export default auth;
