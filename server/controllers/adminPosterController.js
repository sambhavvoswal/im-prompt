import Poster from '../models/Poster.js';
import Trend from '../models/Trend.js';
import { syncTrendsToJson } from '../utils/updateTrendsJson.js';

// @desc    Get all posters
// @route   GET /api/admin/posters
// @access  Private (Admin)
export const getAdminPosters = async (req, res) => {
    try {
        const posters = await Poster.find().populate('trendId', 'title slug').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posters });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a new poster
// @route   POST /api/admin/posters
// @access  Private (Admin)
export const createPoster = async (req, res) => {
    try {
        const poster = await Poster.create(req.body);

        // Update poster count in trend
        await Trend.findByIdAndUpdate(req.body.trendId, {
            $inc: { posterCount: 1 }
        });
        await syncTrendsToJson();

        res.status(201).json({ success: true, data: poster });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a poster
// @route   PUT /api/admin/posters/:id
// @access  Private (Admin)
export const updatePoster = async (req, res) => {
    try {
        // Track previous trend to update counts if trend changed
        const existingPoster = await Poster.findById(req.params.id);
        
        if (!existingPoster) {
            return res.status(404).json({ success: false, message: 'Poster not found' });
        }

        const poster = await Poster.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // If trendId changed, update counts
        if (req.body.trendId && existingPoster.trendId.toString() !== req.body.trendId) {
            await Trend.findByIdAndUpdate(existingPoster.trendId, { $inc: { posterCount: -1 } });
            await Trend.findByIdAndUpdate(req.body.trendId, { $inc: { posterCount: 1 } });
            await syncTrendsToJson();
        }

        res.status(200).json({ success: true, data: poster });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a poster
// @route   DELETE /api/admin/posters/:id
// @access  Private (Admin)
export const deletePoster = async (req, res) => {
    try {
        const poster = await Poster.findByIdAndDelete(req.params.id);
        if (!poster) {
            return res.status(404).json({ success: false, message: 'Poster not found' });
        }

        // Update poster count in trend
        await Trend.findByIdAndUpdate(poster.trendId, {
            $inc: { posterCount: -1 }
        });
        await syncTrendsToJson();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
