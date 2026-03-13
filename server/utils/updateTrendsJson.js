import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Trend from '../models/Trend.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the hardcoded frontend JSON
// server/utils/updateTrendsJson.js -> relative to client/src/data/trends.json
const JSON_FILE_PATH = path.join(__dirname, '../../client/src/data/trends.json');

export const syncTrendsToJson = async () => {
    try {
        // Fetch all active trends from MongoDB
        const trends = await Trend.find({ isActive: true }).lean();
        
        // Transform the Mongoose documents to match the JSON structure
        const jsonTrends = trends.map(t => ({
            id: t.slug, // Use slug as id for frontend mapping
            slug: t.slug,
            title: t.title,
            emoji: t.emoji || '',
            description: t.description || '',
            category: t.category,
            tags: t.tags || [],
            coverImage: t.coverImage || '',
            isTrending: t.isTrending || false,
            posterCount: t.posterCount || 0
        }));

        // Write to file
        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(jsonTrends, null, 4), 'utf8');
        console.log('Successfully synced MongoDB trends to client/src/data/trends.json');
        return true;
    } catch (error) {
        console.error('Error syncing trends to JSON:', error);
        return false;
    }
};
