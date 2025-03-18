import prisma from "../utils/db.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../helpers/User.js";
import { uploadImage } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Generate tokens and update refreshToken in DB
const generateRefreshAndAccessToken = async (userId) => {
  const refreshToken = generateRefreshToken(userId);
  const accessToken = generateAccessToken(userId);

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });

  return { refreshToken, accessToken };
};

// SIGNUP
const SignUp = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password, phoneNumber, DOB } = req.body;

  // Check if the user already exists by email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return next(new ApiError(400, "User already exists"));
  }

  // Check if the phone number already exists
  const existingPhoneNumber = await prisma.user.findUnique({
    where: { phoneNumber },
  });
  if (existingPhoneNumber) {
    return next(new ApiError(401, "Phone Number already exists"));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Handle image upload (Profile image is required)
  const ProfileImgPath = req.file?.path;
  if (!ProfileImgPath) {
    return next(new ApiError(400, "Image is required"));
  }
  const ProfileImg = await uploadImage(ProfileImgPath);
  if (!ProfileImg) {
    return next(new ApiError(400, "Image upload failed"));
  }

  // Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      Image: ProfileImg.url,
      password: hashedPassword,
      phoneNumber,
      DOB,
    },
  });

  // Send response with the newly created user
  res
    .status(201)
    .json(new ApiResponse(201, newUser, "User created successfully"));
});

// LOGIN
const Login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(new ApiError(401, "Invalid email or password"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError(401, "Invalid email or password"));
    }

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
      user.id
    );

    // Set cookie options; secure flag is enabled only in production
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in development
      sameSite: "lax", // Adjust as needed; "lax" works for most cases.
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { userId: user.id, accessToken },
          "User logged in successfully"
        )
      );
  } catch (error) {
    return next(error);
  }
});

// LOGOUT
const Logout = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return next(new ApiError(401, "Unauthorized"));
  }
  const userId = req.user.id;
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  res.clearCookie("refreshToken", options);
  res.clearCookie("accessToken", options);
  res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// GET USER BY ID
const getUserById = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// UPDATE USER (with optional image update)
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, phoneNumber, DOB, interest } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  
  // Override the user's previous interests with the provided interests
  let updatedData = { name, phoneNumber, DOB, interest };

  // If a new image file is provided, upload it
  if (req.file?.path) {
    const profileImg = await uploadImage(req.file.path);
    if (!profileImg) {
      return next(new ApiError(400, "Image upload failed"));
    }
    updatedData.Image = profileImg.url;
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: updatedData,
  });

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

// GET USER NAME
const getUserName = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, user.name, "User name fetched successfully"));
});

const getAllAcceptedByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return next(new ApiError(400, "userId is required"));
    }

    // Get the user's accepted places (array of place IDs)
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        accepted: true,
      },
    });

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    if (user.accepted.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No accepted places found."));
    }

    // Fetch all places with IDs in the accepted array
    const places = await prisma.place.findMany({
      where: {
        id: { in: user.accepted },
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          places,
          "All accepted places fetched successfully."
        )
      );
  } catch (error) {
    console.error("Error fetching places:", error);
    res
      .status(500)
      .json(new ApiError(500, "Error fetching places.", error.message));
  }
});

const getInterest = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
      select: { interest: true }, // Only select the interest field
    });
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          user,
          "User interest fetched successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Error fetching user interest.", error.message));
  }
});

// Get user rated places by user id
const getUserRatedPlaces = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, user.rated, "User rated places fetched successfully"));
});


const completedPlaces = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { placeId } = req.body;

  try {
    // Fetch the current user data
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
      select: { completed: true }, // Fetch only the completed array
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // If the placeId is already in the completed array, return the user data without updating
    if (user.completed.includes(placeId)) {
      return res.json({ message: "Place already marked as completed.", user });
    }

    // Update the user by pushing the new placeId
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: {
        completed: {
          push: placeId,
        },
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating completed places:", error);
    res.status(500).json({ error: "An error occurred while updating the completed array." });
  }
});


const getCompletedPlaces = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { completed: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const completedPlaces = await prisma.place.findMany({
      where: { id: { in: user.completed } },
    });

    res.json(completedPlaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching completed places." });
  }
};



export {
  SignUp,
  Login,
  Logout,
  getUserById,
  updateUser,
  getAllAcceptedByUserId,
  getUserName,
  getInterest,
  completedPlaces,
  getCompletedPlaces
};
