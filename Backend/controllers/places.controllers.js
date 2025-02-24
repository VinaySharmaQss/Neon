import prisma from "../utils/db.js";
import { uploadImage } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// mainImage , footerLogo
// waetherLogo hardcoded krna h chyta rukega tu
const createPlace = asyncHandler(async (req, res) => {
  try {
    const {title,temperature, rating, description, eventTime, location, eventType, footerLogo, footerDescription, footerLink} = req.body;
    if(!title || !temperature || !rating || !description || !eventTime || !location || !eventType || !footerLogo || !footerDescription || !footerLink) {
       throw new ApiError(400, "All fields are required");
    }
    const mainImagePath = req.file?.path;
     if(!mainImagePath) {
       throw new ApiError(400, "Main image is required");
     }
     const mainImage = await uploadImage(mainImagePath);
     console.log(mainImage);
 
     const footerLogoPath = req.file?.path;
     if(!footerLogoPath) {
       throw new ApiError(400, "Footer logo is required");
     }
     const footerLogoImage = await uploadImage(footerLogoPath);
     console.log(footerLogoImage);
 
     const place = await prisma.place.create({
       data: {
         title,
         temperature,
         rating,
         description,
         eventTime,
         location,
         eventType,
         mainImage: mainImage.url,
         footerLogo: footerLogoImage.url,
 
       }
     })
     res.status(201).json(new ApiResponse(201, "Place created successfully", place));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Internal server error", error.message));
  }
})

// get the card by id
const getPlaceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const place = await prisma.places.findUnique({
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
    const places = await prisma.places.findMany({
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
      // Expect the place id as a URL parameter
      const placeId = parseInt(req.params.id);
  
      // Extract fields from the request body
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
  
      // Check if new files have been provided and update images accordingly.
      // Depending on your file upload configuration (e.g., using multer's upload.fields),
      // req.files might contain separate arrays for mainImage and footerLogo.
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
  


export { createPlace,getPlaceById , getAllPlaces, updatePlace};