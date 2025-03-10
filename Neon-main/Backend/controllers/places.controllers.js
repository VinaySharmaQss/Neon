import prisma from "../utils/db.js";
import { uploadImage } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// mainImage , footerLogo
// waetherLogo hardcoded krna h chyta rukega tu
const createPlace = asyncHandler(async (req, res, next) => {
  try {
    const {
      title,
      temperature,
      rating,
      description,
      eventTime,
      eventEndTime,
      category,
      location,
      eventType,
      footerDescription,
    } = req.body;
    if (
      !title ||
      !temperature ||
      !rating ||
      !description ||
      !eventTime ||
      !eventEndTime ||
      !category ||
      !location ||
      !eventType ||
      !footerDescription
    ) {
      throw new ApiError(400, "All fields are required");
    }
    if (rating < 0 || rating > 5) {
      throw new ApiError(400, "Rating must be between 0 and 5");
    }

    // Use req.files to get two files
    const mainImagePath = req.files?.mainImage?.[0]?.path;
    if (!mainImagePath) {
      throw new ApiError(400, "Main image is required");
    }
    const mainImage = await uploadImage(mainImagePath);
    console.log("Main Image:", mainImage);

    const footerLogoPath = req.files?.footerLogo?.[0]?.path;
    if (!footerLogoPath) {
      throw new ApiError(400, "Footer logo is required");
    }
    const footerLogoImage = await uploadImage(footerLogoPath);
    console.log("Footer Logo:", footerLogoImage);

    const place = await prisma.place.create({
      data: {
        title,
        temperature,
        rating: parseFloat(rating),
        eventEndTime,
        category,
        description,
        eventTime,
        location,
        eventType,
        mainImage: mainImage.url,
        footerLogo: footerLogoImage.url,
        footerDescription,
      },
    });
    console.log("Created Place:", place);
    res
      .status(201)
      .json(new ApiResponse(201, place, "Place created successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, "Internal server error", error.message));
  }
});

// get the card by id
const getPlaceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const place = await prisma.place.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        reviews: true,
      },
    });
    if (!place) {
      throw new ApiError(404, "Place not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, "Place fetched successfully", place));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, "Internal server error", error.message));
  }
});
// Get All Cards
const getAllPlaces = asyncHandler(async (req, res) => {
  try {
    const places = await prisma.place.findMany({
      include: {
        reviews: true,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, "Places fetched successfully", places));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, "Internal server error", error.message));
  }
});
// update the places also upload the updatedImage
const updatePlace = asyncHandler(async (req, res) => {
  try {
    const placeId = parseInt(req.params.id);

    const {
      title,
      temperature,
      rating,
      description,
      eventTime,
      location,
      eventType,
      footerDescription,
      footerLink,
    } = req.body;

    // Build an update object with the fields to update
    let updateData = {
      title,
      temperature,
      rating,
      description,
      eventTime,
      location,
      eventType,
      footerDescription,
      footerLink,
    };

    if (req.files && req.files.mainImage) {
      // Assume req.files.mainImage is an array (e.g., when using upload.fields)
      const mainImagePath = req.files.mainImage[0].path;
      const mainImage = await uploadImage(mainImagePath);
      updateData.mainImage = mainImage.url;
    }

    if (req.files && req.files.footerLogo) {
      const footerLogoPath = req.files.footerLogo[0].path;
      const footerLogo = await uploadImage(footerLogoPath);
      updateData.footerLogo = footerLogo.url;
    }

    // Update the place record in the database using Prisma
    const updatedPlace = await prisma.place.update({
      where: { id: placeId },
      data: updateData,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Place updated successfully", updatedPlace));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, "Internal server error", error.message));
  }
});

const addViewedPlace = asyncHandler(async (req, res, next) => {
  const { userId, placeId } = req.body;

  if (!userId || !placeId) {
    return next(new ApiError(400, "userId and placeId are required"));
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId, 10) },
  });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  if (user.viewed.includes(parseInt(placeId, 10))) {
    return res
      .status(200)
      .json(new ApiResponse(200, user.viewed, "Place already added to viewed"));
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId, 10) },
    data: {
      viewed: { push: parseInt(placeId, 10) },
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser.viewed, "Place added to viewed"));
});

const getViewedPlaces = asyncHandler(async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  // Check if user exists and get only the 'viewed' field
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { viewed: true },
  });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  // If no viewed places, return early
  if (!user.viewed || user.viewed.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No viewed places found"));
  }

  // Fetch only the viewed places
  const viewedPlaces = await prisma.place.findMany({
    where: {
      id: { in: user.viewed },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, viewedPlaces, "Viewed places fetched successfully")
    );
});

const addToFavourite = asyncHandler(async (req, res, next) => {
  const { userId, placeId } = req.body;

  if (!userId || !placeId) {
    return next(new ApiError(400, "userId and placeId are required"));
  }

  try {
    const place = await prisma.place.findUnique({
      where: { id: placeId },
    });

    if (!place) {
      return next(new ApiError(404, "Place not found"));
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: Number(userId),
        placeId: Number(placeId),
      },
    });

    if (existingFavorite) {
      return next(new ApiError(400, "Place already in favourites"));
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: Number(userId),
        placeId: Number(placeId),
      },
    });

    res
      .status(200)
      .json(new ApiResponse(200, favorite, "Place added to favourites"));
  } catch (error) {
    console.error("Error adding to favourites:", error);
    res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error", error.message));
  }
});

const removeFromFaviourate = asyncHandler(async (req, res, next) => {
  try {
    const { userId, placeId } = req.body;
    if (!userId || !placeId) {
      return next(new ApiError(400, "userId and placeId are required"));
    }

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: Number(userId),
        placeId: Number(placeId),
      },
    });

    if (!favorite) {
      return next(new ApiError(404, "Favorite not found"));
    }

    await prisma.favorite.delete({
      where: { id: favorite.id },
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, null, "Place removed from favourites successfully")
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(
        500,
        "Error removing the place from favourites",
        error.message
      )
    );
  }
});
const getAllFavouritePlaces = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(new ApiError(400, "userId is required"));
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: Number(userId) },
      include: { place: true }, // Get place details
    });

    res.status(200).json(
      new ApiResponse(
        200,
        favorites.map((fav) => fav.place), // Just return the places
        "Favourite places fetched successfully"
      )
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Error fetching favourite places", error.message)
    );
  }
});

const getAllReviewsofPlaces = asyncHandler(async (req, res) => {
  const { placeId } = req.params;
  try {
    if (!placeId) {
      return next(new ApiError(400, "placeId is required"));
    }
    const reviews = await prisma.review.findMany({
      where: {
        placeId: parseInt(placeId),
      },
      select: {
        id: true,
        userImage: true,
        userName: true,
        reviewDate: true,
        reviewText: true,
        rating: true,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, reviews, "All reviews fetched successfully."));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json(new ApiError(500, "Error fetching reviews.", error.message));
  }
});


export {
  createPlace,
  getPlaceById,
  getAllPlaces,
  updatePlace,
  addViewedPlace,
  getViewedPlaces,
  addToFavourite,
  getAllFavouritePlaces,
  removeFromFaviourate,
  getAllReviewsofPlaces,
};
