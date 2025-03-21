import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js'; // Your custom routes
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ApiError } from './utils/ApiError.js';
import { Server } from 'socket.io'; // Socket.io import
import http from 'http'; // HTTP server import
import Stripe from 'stripe';

// Load environment variables from .env file
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECERT_KEY);

// Create an instance of express app
const app = express();

// Set the port from environment variables or default to 4000
const PORT = process.env.PORT || 4000;

// ✅ Apply CORS middleware BEFORE defining routes
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Adjust your frontend URL here
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'device-remember-token',
      'Origin',
      'Accept',
    ],
  })
);

// Middleware for parsing JSON, URL-encoded bodies, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files from the "public" folder
app.use(express.static('public'));

// Use custom routes
app.use(routes);

// Root route for testing server status
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }
  console.error('Unhandled error:', err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ✅ Create HTTP server to work with socket.io
const server = http.createServer(app);

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Adjust your frontend URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'device-remember-token',
      'Origin',
      'Accept',
    ],
  },
});

// ✅ Listen for socket connections
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Example custom event listener
  socket.on('someEvent', (data) => {
    console.log('📩 Received data:', data);
    socket.emit('responseEvent', { message: '✅ Data received!' });
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// ✅ Export io if you need to use it elsewhere
export { io };

// ✅ Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
