import prisma from "../utils/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createReview = asyncHandler(async (req, res) => {
    const { userId, userName, userImage, feedback, ratings, placeId, cusineId, reviewDate } = req.body;
  
    if (!ratings || Object.keys(ratings).length === 0) {
      throw new ApiError(400, "Ratings are required.");
    }
  
    if (!placeId && !cusineId) {
      throw new ApiError(400, "Either placeId or cusineId is required.");
    }
  
    if (placeId && cusineId) {
      throw new ApiError(400, "Provide either placeId or cusineId, not both.");
    }
  
    if (placeId) {
      const placeExists = await prisma.place.findUnique({
        where: { id: parseInt(placeId) }
      });
      if (!placeExists) {
        throw new ApiError(404, "Place not found.");
      }
    }
  
    if (cusineId) {
      const cusineExists = await prisma.cuisines.findUnique({
        where: { id: parseInt(cusineId) }
      });
      if (!cusineExists) {
        throw new ApiError(404, "Cuisine not found.");
      }
    }
  
    const totalRating = Object.values(ratings).reduce(
      (sum, value) => sum + value,
      0
    );
    const averageRating = totalRating / Object.keys(ratings).length;
  
    const reviewData = {
      userId: parseInt(userId),
      userName,
      userImage,
      reviewText: feedback,
      rating: averageRating,
      reviewDate: reviewDate ? new Date(reviewDate) : new Date(),
      placeId: placeId ? parseInt(placeId) : null,
      cusineId: cusineId ? parseInt(cusineId) : null,
    };
  
    try {
      const review = await prisma.review.create({
        data: reviewData,
      });
  
      return res
        .status(201)
        .json(new ApiResponse(201, review, "Review created successfully."));
    } catch (error) {
      console.error("Error creating review:", error);
      throw new ApiError(500, "Error creating review.", error.message);
    }
  });
  
  
  

const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, reviews, "All reviews fetched successfully."));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new ApiError(500, "Error fetching reviews.", error.message);
  }
});

// get al review by place id
const getReviewByPlaceId = asyncHandler(async (req, res) => {
  const { placeId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: {
        placeId: parseInt(placeId),
      },
      include: {
        user: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, reviews, "All reviews fetched successfully."));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new ApiError(500, "Error fetching reviews.", error.message);
  }
});

// get al review by cusine id
const getReviewByCusineId = asyncHandler(async (req, res) => {
  const { cusineId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: {
        cusineId: parseInt(cusineId),
      },
      include: {
        user: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, reviews, "All reviews fetched successfully."));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new ApiError(500, "Error fetching reviews.", error.message);
  }
});

// get al review by user id
const getReviewByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        user: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, reviews, "All reviews fetched successfully."));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new ApiError(500, "Error fetching reviews.", error.message);
  }
});

export {
  createReview,
  getAllReviews,
  getReviewByPlaceId,
  getReviewByCusineId,
  getReviewByUserId,
};
