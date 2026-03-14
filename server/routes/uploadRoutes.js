import express from 'express';
import { upload, cloudinary } from '../config/cloudinary.js';
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

// @desc    Delete an image from Cloudinary
// @route   DELETE /api/upload
// @access  Private (Admin)
router.delete('/', protectAdmin, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: 'No image URL provided' });
    }

    // Extract public ID from Cloudinary URL
    const parts = url.split('/upload/');
    if (parts.length !== 2) {
      return res.status(400).json({ success: false, message: 'Invalid Cloudinary URL' });
    }

    const afterUpload = parts[1];
    const pathParts = afterUpload.split('/');
    pathParts.shift(); // remove version (e.g. v12345678)
    const publicIdWithExt = pathParts.join('/');
    const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));

    const result = await cloudinary.uploader.destroy(publicId);
    
    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Server error deleting image' });
  }
});

export default router;
