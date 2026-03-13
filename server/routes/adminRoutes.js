import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import { getAdminTrends, createTrend, updateTrend, deleteTrend } from '../controllers/adminTrendController.js';
import { getAdminPosters, createPoster, updatePoster, deletePoster } from '../controllers/adminPosterController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);

// Trends Routes
router.route('/trends')
    .get(protectAdmin, getAdminTrends)
    .post(protectAdmin, createTrend);

router.route('/trends/:id')
    .put(protectAdmin, updateTrend)
    .delete(protectAdmin, deleteTrend);

// Posters Routes
router.route('/posters')
    .get(protectAdmin, getAdminPosters)
    .post(protectAdmin, createPoster);

router.route('/posters/:id')
    .put(protectAdmin, updatePoster)
    .delete(protectAdmin, deletePoster);

export default router;
