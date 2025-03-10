
import prisma from "../utils/db.js";
import { uploadImage } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCuisine = asyncHandler(async (req, res, next) => {
    const userId = req.body.userId || req.params.id || 1;
    console.log(req.body);
    try {
        const { title, date, description } = req.body;
        if (!title || !date || !description) {
            return next(new ApiError("Please provide all required fields", 400));
        }
        const logo = req.files?.logo[0].path;
        if (!logo) {
            return next(new ApiError("Logo is required", 400));
        }
        const logoUrl = await uploadImage(logo);
        if (!logoUrl) {
            return next(new ApiError("Logo upload failed", 400));
        }
        const Image = req.files?.image[0]?.path;
        if (!Image) {
            return next(new ApiError("Image is required", 400));
        }
        const imageUrl = await uploadImage(Image);
        if (!imageUrl) {
            return next(new ApiError("Image upload failed", 400));
        }
        const cuisine = await prisma.cuisines.create({
            data: {
                title,
                date,
                description,
                logo: logoUrl.url,
                image: imageUrl.url,
                userId: parseInt(userId), // Ensure userId is an integer
            },
        });
        res.status(200).json(new ApiResponse(200, cuisine, "Cuisine created successfully"));
    } catch (error) {
        console.error("Error creating cuisine:", error); // Log the error for debugging
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
});


const getAllCuisine = asyncHandler(async (req, res, next) => {
    try {
        const cuisine = await prisma.cuisines.findMany();
        res.status(200).json(new ApiResponse(200, cuisine, "Cuisine fetched successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
})

const getCuisineById = asyncHandler(async (req, res, next) => {
    try {
        const {id} = req.params;
        const cuisine = await prisma.cuisine.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if(!cuisine) {
            return next(new ApiError("Cuisine not found", 404));
        }
        res.status(200).json(new ApiResponse(200, cuisine, "Cuisine fetched successfully"));
    }
    catch (error) {
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
})

// Update the cusine
const updateCuisine = asyncHandler(async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, date, description} = req.body;
        const Logo = req.file?.path;
        const cuisine = await prisma.cuisine.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if(!cuisine) {
            return next(new ApiError("Cuisine not found", 404));
        }
        const updatedCuisine = await prisma.cuisine.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                date,
                description,
                Logo: Logo ? await uploadImage(Logo).url : cuisine.Logo
            }
        })
        res.status(200).json(new ApiResponse(200, updatedCuisine, "Cuisine updated successfully"));

        }
        catch (error) {
            res.status(500).json(new ApiResponse(500, null, "Internal server error"));
        }

})
// Delete the cuisine
const deleteCuisine = asyncHandler(async (req, res, next) => {
    try {
        const {id} = req.params;
        const cuisine = await prisma.cuisine.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if(!cuisine) {
            return next(new ApiError("Cuisine not found", 404));
        }
        await prisma.cuisine.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json(new ApiResponse(200, null, "Cuisine deleted successfully"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
})

export {createCuisine, getAllCuisine, getCuisineById, updateCuisine, deleteCuisine};
