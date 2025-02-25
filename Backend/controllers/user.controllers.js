import prisma from "../utils/db.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../helpers/User.js";
import { uploadImage } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateRefreshAndAccessToken = async (userId) => {
  const refreshToken = generateRefreshToken(userId);
  const accessToken = generateAccessToken(userId);

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken
     },
  });

  return { refreshToken, accessToken };
};

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

  // Handle the image upload (Profile image is required)
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

  // Send a response with the newly created user
  res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});


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

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    })
    res
      .status(200)
      .json(new ApiResponse(200, { userId:user.id, accessToken }, "User logged in successfully"));
  } catch (error) {
    // This will catch any error that occurs in the try block
    return next(error);
  }
});

const Logout = asyncHandler(async(req,res,next)=>{
  if (!req.user || !req.user.id) {
    return next(new ApiError(401, "Unauthorized"));
  }
    const userId = req.user.id;
    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });
    const options={
        httpOnly: true,
        secure: true,
    }
    res.clearCookie("refreshToken",options);
    res.clearCookie("accessToken",options);
    res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
})


// Get the user by Id
const getUserById = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  id=parseInt(id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
})

// Update the user
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phoneNumber, DOB } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id, 10)},
    data: {
      name,
      email,
      phoneNumber,
      DOB,
    },
  });
  res.status(200).json(new ApiResponse(200, user, "User updated successfully"));

  })

// Get the user name
const getUserName = asyncHandler(async( req, res, next)=>{
  const { id} = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10)},
  })
  if(!user){
    return next(new ApiError(404, "User not found"));
  }
  res.status(200).json(new ApiResponse(200, user.name, "User name fetched successfully"));
})

export { SignUp, Login, Logout, getUserById, updateUser };

