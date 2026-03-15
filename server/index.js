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
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-poster-gallery')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            
            // Start the self-ping mechanism to keep Render server awake
            // If API_URL is provided in production, use it. Otherwise default to localhost
            const serverUrl = process.env.API_URL || `http://localhost:${PORT}`;
            startServerPing(serverUrl);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
