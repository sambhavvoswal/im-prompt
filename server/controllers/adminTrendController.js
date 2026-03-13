import Trend from '../models/Trend.js';
import Poster from '../models/Poster.js';

// @desc    Get all trends (including inactive for admin)
// @route   GET /api/admin/trends
// @access  Private (Admin)
export const getAdminTrends = async (req, res) => {
    try {
        const trends = await Trend.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: trends });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a new trend
// @route   POST /api/admin/trends
// @access  Private (Admin)
export const createTrend = async (req, res) => {
    try {
        const trend = await Trend.create(req.body);
        res.status(201).json({ success: true, data: trend });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a trend
// @route   PUT /api/admin/trends/:id
// @access  Private (Admin)
export const updateTrend = async (req, res) => {
    try {
        const trend = await Trend.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!trend) {
            return res.status(404).json({ success: false, message: 'Trend not found' });
        }
        res.status(200).json({ success: true, data: trend });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a trend
// @route   DELETE /api/admin/trends/:id
// @access  Private (Admin)
export const deleteTrend = async (req, res) => {
    try {
        const trendId = req.params.id;
        const trend = await Trend.findByIdAndDelete(trendId);
        if (!trend) {
            return res.status(404).json({ success: false, message: 'Trend not found' });
        }

        // Fetch all posters associated with this trend to return them as backup data
        const deletedPosters = await Poster.find({ trendId });
        
        // Cascade delete all posters associated with this trend
        await Poster.deleteMany({ trendId });

        res.status(200).json({ 
            success: true, 
            message: 'Trend and associated posters deleted successfully', 
            data: {
                trend,
                deletedPosters
            } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
