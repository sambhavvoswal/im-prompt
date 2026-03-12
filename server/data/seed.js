import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trend from '../models/Trend.js';
import Poster from '../models/Poster.js';
import { TRENDS, POSTERS } from '../../client/src/data/hardcoded.js';

dotenv.config();

// Connect to DB directly
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-poster-gallery');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        console.log('Destroying existing data...');
        await Trend.deleteMany();
        await Poster.deleteMany();

        console.log('Seeding Trends...');
        // Create a mapping from slug to actual mongo ObjectId
        const slugToIdMap = {};
        const trendsToInsert = TRENDS.map(t => {
            // Removing "id" field since Mongoose assigns _id automatically
            const { id, ...trendData } = t;
            return trendData;
        });

        const insertedTrends = await Trend.insertMany(trendsToInsert);

        // Build map for posters
        insertedTrends.forEach(trend => {
            slugToIdMap[trend.slug] = trend._id;
        });

        console.log(`Seeded ${insertedTrends.length} trends.`);

        console.log('Seeding Posters...');
        const postersToInsert = POSTERS.map(p => {
            const { id, trendId, ...posterData } = p;
            return {
                ...posterData,
                trendId: slugToIdMap[trendId]
            };
        });

        const insertedPosters = await Poster.insertMany(postersToInsert);
        console.log(`Seeded ${insertedPosters.length} posters.`);

        console.log('Seed completed successfully! 🌱');
        process.exit();

    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

seedData();
