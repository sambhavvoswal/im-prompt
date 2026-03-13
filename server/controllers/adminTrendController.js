import Trend from '../models/Trend.js';
import { syncTrendsToJson } from '../utils/updateTrendsJson.js';

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
        await syncTrendsToJson();
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
        await syncTrendsToJson();
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
        const trend = await Trend.findByIdAndDelete(req.params.id);
        if (!trend) {
            return res.status(404).json({ success: false, message: 'Trend not found' });
        }
        await syncTrendsToJson();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
