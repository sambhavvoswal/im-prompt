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
import { errorHandler } from './middleware/errorHandler.js';

// Rate limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: 'Too many requests from this IP, please try again after a minute',
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
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

// Error handler middleware must be after all routes
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-poster-gallery')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });
