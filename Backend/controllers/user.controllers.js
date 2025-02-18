import { z } from 'zod';
import prisma from "../utils/db";

// Define the schema for the SignUp input using Zod
const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  DOB: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date of birth",
  }),
});

// Define the schema for the Login input using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignUp = async (req, res) => {
  try {
    // Validate request body using Zod
    const parsedBody = signUpSchema.safeParse(req.body);

    if (!parsedBody.success) {
      // Return validation errors if any field is invalid
      return res.status(400).json({ message: parsedBody.error.errors[0].message });
    }

    const { name, email, password, phoneNumber, DOB } = req.body;

    // Check if the user already exists in the database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
        DOB,
      },
    });

    // Respond with success message
    res.status(200).json({ message: "User created successfully", newUser });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    // Validate request body using Zod
    const parsedBody = loginSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ message: parsedBody.error.errors[0].message });
    }

    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Respond with success message
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { SignUp, Login };
