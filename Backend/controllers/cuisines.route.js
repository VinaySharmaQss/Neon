import prisma from "../utils/db.js";
import { uploadImage } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCuisine = asyncHandler(async (req, res, next) => {
    try {
        const {title, date, description} = req.body;
    if(!title || !date || !description) {
        return next(new ApiError("Please provide all required fields", 400));
    }
    const Logo = req.file?.path;
    if(!Logo) {
        return next(new ApiError("Logo is required", 400));
    }
    const LogoUrl = await uploadImage(Logo);
    if(!LogoUrl) {
        return next(new ApiError("Logo upload failed", 400));
    }
    const cuisine = await prisma.cuisine.create({
        data: {
            title,
            date,
            description,
            Logo: LogoUrl.url
        }
    });
    res.status(200).json(new ApiResponse(200, cuisine, "Cuisine created successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
})

const getAllCuisine = asyncHandler(async (req, res, next) => {
    try {
        const cuisine = await prisma.cuisine.findMany();
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
