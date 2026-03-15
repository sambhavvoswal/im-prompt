import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema({
    trendId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trend' }, // null if suggesting a new trend
    suggestedTrendName: { type: String }, // used when suggesting a new trend
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    negativePrompt: { type: String },
    tags: [{ type: String }],
    style: {
        type: String,
        enum: ['photorealistic', 'illustration', '3d', 'watercolor', 'cinematic', 'anime', 'other'],
        default: 'photorealistic'
    },
    aspectRatio: {
        type: String,
        enum: ['1:1', '16:9', '9:16', '4:5', '3:2', '2:3'],
        default: '1:1'
    },
    submitterName: { type: String, required: true }, // Required — used for credits
    submitterEmail: { type: String },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adminNotes: { type: String },
    isRead: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

export default Suggestion;
