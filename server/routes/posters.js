import express from 'express';
import {
    getPosters,
    getTrendingPosters,
    getPosterById,
    copyPoster,
    likePoster
} from '../controllers/postersController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Specific rate limiting for interaction endpoints
const interactLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // Limit each IP to 30 requests per window
    message: { message: 'Too many interaction requests, please try again later' }
});

router.route('/').get(getPosters);
router.route('/trending').get(getTrendingPosters);
router.route('/:id').get(getPosterById);

router.route('/:id/copy').post(interactLimiter, copyPoster);
router.route('/:id/like').post(interactLimiter, likePoster);

export default router;
