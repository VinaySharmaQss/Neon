import prisma from "../utils/db.js";
import { uploadImage } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// mainImage , footerLogo
// waetherLogo hardcoded krna h chyta rukega tu
const createPlace = asyncHandler(async (req, res, next) => {
  try {
    const { title, temperature, rating, description, eventTime,eventEndTime,category, location, eventType, footerDescription } = req.body;
    if (!title || !temperature || !rating || !description || !eventTime ||  !eventEndTime || !category || !location || !eventType || !footerDescription) {
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
        rating:parseFloat(rating),
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
    res.status(201).json(new ApiResponse(201, place, "Place created successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Internal server error", error.message));
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
    res.status(200).json(new ApiResponse(200, "Place fetched successfully", place));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Internal server error", error.message));
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
    res.status(200).json(new ApiResponse(200, "Places fetched successfully", places));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Internal server error", error.message));
  }
})
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
  
      res.status(200).json(new ApiResponse(200, "Place updated successfully", updatedPlace));
    } catch (error) {
      res.status(500).json(new ApiResponse(500, "Internal server error", error.message));
    }
  });
  
  const addViewedPlace = asyncHandler(async (req, res, next) => {
    // Expect userId and placeId in the body (or get userId from req.user if using auth middleware)
    const { userId, placeId } = req.body;
    if (!userId || !placeId) {
      return next(new ApiError(400, "userId and placeId are required"));
    }
    // Update the user's viewed array by pushing the new placeId
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: { 
        viewed: { push: parseInt(placeId, 10) } 
      },
    });
    res.status(200).json(new ApiResponse(200, updatedUser.viewed, "Place added to viewed"));
  });

  const getViewedPlaces = asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    // user.viewed is an array of place IDs
    const viewedPlaces = await prisma.place.findMany({
      where: {
        id: { in: user.viewed || [] },
      },
    });
    res.status(200).json(new ApiResponse(200, viewedPlaces, "Viewed places fetched successfully"));
  });

export { createPlace,getPlaceById , getAllPlaces, updatePlace, addViewedPlace, getViewedPlaces };