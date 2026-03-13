import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protectAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }
    
    // Cloudinary returns the full URL in file.path
    res.status(200).json({
      success: true,
      url: req.file.path
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Server error parsing image upload' });
  }
});

export default router;
