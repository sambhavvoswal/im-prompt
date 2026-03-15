import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema({
    trendId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trend', required: true },
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
    beforeImage: { type: String },
    previewImage: { type: String },
    credits: { type: String }, // Name of the contributor who suggested this prompt
    copyCount: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Poster = mongoose.model('Poster', posterSchema);

export default Poster;
