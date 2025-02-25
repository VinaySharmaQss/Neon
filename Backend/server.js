import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import { ApiError } from './utils/ApiError.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Apply CORS middleware BEFORE defining routes
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",  // Allow frontend origin
    credentials: true,  // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "device-remember-token",
        "Origin",
        "Accept",
    ],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());

// ✅ Now add routes AFTER applying CORS
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Error-handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }
    console.error("Unhandled error:", err);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
