import mongoose from 'mongoose';
import Poster from '../models/Poster.js';

// @desc    Fetch posters for a specific trend
// @route   GET /api/posters?trendId=xxx
// @access  Public
export const getPosters = async (req, res, next) => {
    try {
        const { trendId } = req.query;
        let query = { isActive: true };

        if (trendId) {
            // Allow searching by ObjectId or String representations if correctly formatted
            query.trendId = trendId;
        }

        const posters = await Poster.find(query).sort({ copyCount: -1 });
        res.json(posters);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch trending posters across all active trends
// @route   GET /api/posters/trending
// @access  Public
export const getTrendingPosters = async (req, res, next) => {
    try {
        const posters = await Poster.find({ isActive: true })
            .sort({ copyCount: -1 })
            .limit(8)
            .populate('trendId', 'title slug'); // Optional: grab trend name to display

        res.json(posters);
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single poster by ID
// @route   GET /api/posters/:id
// @access  Public
export const getPosterById = async (req, res, next) => {
    try {
        const poster = await Poster.findById(req.params.id).populate('trendId', 'title slug category');

        if (poster) {
            res.json(poster);
        } else {
            res.status(404);
            throw new Error('Poster not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Increment copy count
// @route   POST /api/posters/:id/copy
// @access  Public
export const copyPoster = async (req, res, next) => {
    try {
        const poster = await Poster.findByIdAndUpdate(
            req.params.id,
            { $inc: { copyCount: 1 } },
            { new: true }
        );

        if (poster) {
            res.json({ copyCount: poster.copyCount });
        } else {
            res.status(404);
            throw new Error('Poster not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Increment likes
// @route   POST /api/posters/:id/like
// @access  Public
export const likePoster = async (req, res, next) => {
    try {
        const poster = await Poster.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (poster) {
            res.json({ likes: poster.likes });
        } else {
            res.status(404);
            throw new Error('Poster not found');
        }
    } catch (error) {
        next(error);
    }
};
