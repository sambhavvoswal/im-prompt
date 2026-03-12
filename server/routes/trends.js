import express from 'express';
import {
    getTrends,
    getTrendBySlug,
    getTrendsByCategory,
    getTrendStats
} from '../controllers/trendsController.js';

const router = express.Router();

router.route('/').get(getTrends);
router.route('/category/:cat').get(getTrendsByCategory);
router.route('/:slug').get(getTrendBySlug);
router.route('/:slug/stats').get(getTrendStats);

export default router;
