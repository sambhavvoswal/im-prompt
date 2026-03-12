import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    emoji: { type: String },
    coverImage: { type: String },
    category: {
        type: String,
        enum: ['festival', 'sports', 'news', 'seasonal', 'occasion', 'other'],
        default: 'occasion'
    },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isTrending: { type: Boolean, default: false },
    posterCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

const Trend = mongoose.model('Trend', trendSchema);

export default Trend;
