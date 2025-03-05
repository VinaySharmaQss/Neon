import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { io } from "../server.js";

export const sendNotifications = asyncHandler(async (req, res, next) => {
    const { message } = req.body;

    if (!message ) {
        throw new ApiError("Please provide both userName and message", 400);
    }

    const notification = {
        message,
        time: new Date().toISOString(),
    };

    io.emit("notification", notification); // emit to all clients

    res.status(200).json(
        new ApiResponse(200, notification, "Notification sent successfully")
    );
});
