import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import trendRoutes from './routes/trends.js';
import posterRoutes from './routes/posters.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { startServerPing } from './utils/pingServer.js';

// Rate limiting
// Keep basic protection on write-heavy endpoints, but don't rate-limit simple GETs
// like `/api/trends` that power the public homepage grid.
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: 'Too many requests from this IP, please try again after a minute',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'GET',
});

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.CLIENT_URL,
            'http://localhost:5173',
            'http://localhost:5174',
            'https://im-prompt.vercel.app' // Add hardcoded fallback for safety
        ];
        
        // Remove trailing slashes for comparison just in case
        const normalizedOrigin = origin.replace(/\/$/, '');
        
        // Allow dynamic Vercel preview URLs
        if (normalizedOrigin.endsWith('.vercel.app')) {
            return callback(null, true);
        }

        if (allowedOrigins.some(allowed => allowed && allowed.replace(/\/$/, '') === normalizedOrigin)) {
            return callback(null, true);
        }
        
        console.warn(`[CORS Blocked] Origin: ${origin} not in allowed list:`, allowedOrigins);
        return callback(new Error(`CORS policy restricts access from origin: ${origin}`), false);
    },
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', limiter); // Apply to all /api routes

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Mount routes
app.use('/api/trends', trendRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/suggestions', suggestionRoutes);

// Error handler middleware must be after all routes
app.use(errorHandler);

// Database connection
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-poster-gallery';
        console.log('Attempting to connect to MongoDB...', uri.split('@')[1] || uri); // Log cluster part only for safety
        
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('Successfully connected to MongoDB');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            const serverUrl = process.env.API_URL || `http://localhost:${PORT}`;
            startServerPing(serverUrl);
        });
    } catch (err) {
        console.error('CRITICAL: Failed to connect to MongoDB');
        console.error(err.message);
        // Important: Still start the server if DB fails? 
        // No, usually best to exit or hang, but for debugging let's see the error.
        process.exit(1);
    }
};

connectDB();
