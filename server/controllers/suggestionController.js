import Suggestion from '../models/Suggestion.js';
import Poster from '../models/Poster.js';

// @desc    Submit a new prompt suggestion (public)
// @route   POST /api/suggestions
// @access  Public
export const submitSuggestion = async (req, res) => {
    try {
        const {
            trendId, suggestedTrendName, title, prompt,
            negativePrompt, tags, style, aspectRatio,
            submitterName, submitterEmail
        } = req.body;

        if (!title || !prompt || !submitterName) {
            return res.status(400).json({ success: false, message: 'Title, prompt, and your name are required.' });
        }

        // Must have either an existing trend or a suggested new trend name
        if (!trendId && !suggestedTrendName) {
            return res.status(400).json({ success: false, message: 'Please select an existing trend or suggest a new one.' });
        }

        const suggestion = await Suggestion.create({
            trendId: trendId || undefined,
            suggestedTrendName: suggestedTrendName || undefined,
            title,
            prompt,
            negativePrompt,
            tags: tags || [],
            style: style || 'photorealistic',
            aspectRatio: aspectRatio || '1:1',
            submitterName,
            submitterEmail,
        });

        res.status(201).json({ success: true, data: suggestion });
    } catch (error) {
        console.error('Error submitting suggestion:', error);
        res.status(500).json({ success: false, message: 'Failed to submit suggestion.' });
    }
};

// @desc    Get all suggestions (admin)
// @route   GET /api/admin/suggestions
// @access  Admin
export const getAdminSuggestions = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status && status !== 'all') {
            filter.status = status;
        }

        const suggestions = await Suggestion.find(filter)
            .populate('trendId', 'title emoji slug')
            .sort({ createdAt: -1 });

        const unreadCount = await Suggestion.countDocuments({ isRead: false });

        res.json({ success: true, data: suggestions, unreadCount });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch suggestions.' });
    }
};

// @desc    Update suggestion status / notes / read state (admin)
// @route   PUT /api/admin/suggestions/:id
// @access  Admin
export const updateSuggestionStatus = async (req, res) => {
    try {
        const { status, adminNotes, isRead } = req.body;
        const suggestion = await Suggestion.findById(req.params.id);

        if (!suggestion) {
            return res.status(404).json({ success: false, message: 'Suggestion not found.' });
        }

        if (status) suggestion.status = status;
        if (adminNotes !== undefined) suggestion.adminNotes = adminNotes;
        if (isRead !== undefined) suggestion.isRead = isRead;

        await suggestion.save();
        res.json({ success: true, data: suggestion });
    } catch (error) {
        console.error('Error updating suggestion:', error);
        res.status(500).json({ success: false, message: 'Failed to update suggestion.' });
    }
};

// @desc    Delete a suggestion (admin)
// @route   DELETE /api/admin/suggestions/:id
// @access  Admin
export const deleteSuggestion = async (req, res) => {
    try {
        const suggestion = await Suggestion.findByIdAndDelete(req.params.id);
        if (!suggestion) {
            return res.status(404).json({ success: false, message: 'Suggestion not found.' });
        }
        res.json({ success: true, message: 'Suggestion deleted.' });
    } catch (error) {
        console.error('Error deleting suggestion:', error);
        res.status(500).json({ success: false, message: 'Failed to delete suggestion.' });
    }
};

// @desc    Convert an approved suggestion into a Poster (admin)
// @route   POST /api/admin/suggestions/:id/convert
// @access  Admin
export const convertToPoster = async (req, res) => {
    try {
        const suggestion = await Suggestion.findById(req.params.id);

        if (!suggestion) {
            return res.status(404).json({ success: false, message: 'Suggestion not found.' });
        }

        if (!suggestion.trendId) {
            return res.status(400).json({
                success: false,
                message: 'Cannot convert: this suggestion has no linked trend. Create the trend first and update the suggestion.'
            });
        }

        const poster = await Poster.create({
            trendId: suggestion.trendId,
            title: suggestion.title,
            prompt: suggestion.prompt,
            negativePrompt: suggestion.negativePrompt,
            tags: suggestion.tags,
            style: suggestion.style,
            aspectRatio: suggestion.aspectRatio,
            credits: suggestion.submitterName,
            isActive: false, // Admin should review and add images before going live
        });

        // Mark suggestion as approved
        suggestion.status = 'approved';
        suggestion.isRead = true;
        await suggestion.save();

        res.json({ success: true, data: poster, message: 'Suggestion converted to poster (inactive — add images to publish).' });
    } catch (error) {
        console.error('Error converting suggestion:', error);
        res.status(500).json({ success: false, message: 'Failed to convert suggestion to poster.' });
    }
};
