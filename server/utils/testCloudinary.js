import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we load the .env file from the server root
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log("Environment Variables Loaded:");
console.log("CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API_KEY:", process.env.CLOUDINARY_API_KEY ? "***PRESENT***" : "MISSING");
console.log("API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "***PRESENT***" : "MISSING");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testUpload() {
    try {
        console.log("Testing Cloudinary Ping...");
        const result = await cloudinary.api.ping();
        console.log("Ping Success:", result);
    } catch (err) {
        console.error("Cloudinary Error:", err);
    }
}

testUpload();
