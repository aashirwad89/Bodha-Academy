const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { getProfile, updateProfile, submitQuestionnaire } = require('../controllers/userController');

// GET /api/user/profile
router.get('/profile', authenticateToken, getProfile);

// PUT /api/user/profile
router.put('/profile', authenticateToken, updateProfile);

// POST /api/user/questionnaire
router.post('/questionnaire', authenticateToken, submitQuestionnaire);

module.exports = router;
