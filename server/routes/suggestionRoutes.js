import express from 'express';
import { submitSuggestion } from '../controllers/suggestionController.js';

const router = express.Router();

// Public route — anyone can submit a suggestion
router.post('/', submitSuggestion);

export default router;
