import Trend from '../models/Trend.js';

// @desc    Fetch all active trends
// @route   GET /api/trends
// @access  Public
export const getTrends = async (req, res, next) => {
    try {
        const trends = await Trend.find({ isActive: true }).sort({ isTrending: -1, createdAt: -1 });
        res.json(trends);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single trend by slug
// @route   GET /api/trends/:slug
// @access  Public
export const getTrendBySlug = async (req, res, next) => {
    try {
        const trend = await Trend.findOne({ slug: req.params.slug, isActive: true });

        if (trend) {
            res.json(trend);
        } else {
            res.status(404);
            throw new Error('Trend not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch trends by category
// @route   GET /api/trends/category/:cat
// @access  Public
export const getTrendsByCategory = async (req, res, next) => {
    try {
        const trends = await Trend.find({
            category: req.params.cat,
            isActive: true
        }).sort({ isTrending: -1, createdAt: -1 });

        res.json(trends);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch stats for a trend (copies and likes)
// @route   GET /api/trends/:slug/stats
// @access  Public
export const getTrendStats = async (req, res, next) => {
    try {
        const trend = await Trend.findOne({ slug: req.params.slug });

        if (!trend) {
            res.status(404);
            throw new Error('Trend not found');
        }

        // This would typically involve aggregating from the Poster model
        // which we will implement on the posters controller and call or replicate here for simplicity
        const { aggregate } = await import('mongoose'); // dynamic import if needed, but standard aggregate is better
        const stats = await mongoose.model('Poster').aggregate([
            { $match: { trendId: trend._id } },
            { $group: { _id: null, totalCopies: { $sum: '$copyCount' }, totalLikes: { $sum: '$likes' } } }
        ]);

        const result = stats.length > 0 ? stats[0] : { totalCopies: 0, totalLikes: 0 };
        res.json({
            totalCopies: result.totalCopies,
            totalLikes: result.totalLikes
        });
    } catch (error) {
        next(error);
    }
};
