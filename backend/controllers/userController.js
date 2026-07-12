const User = require('../models/user');
const calculateDestiny = require('../utils/destinyCalculator');

// GET /api/user/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Wizard not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ message: 'Error retrieving profile from the crystal.' });
  }
};

// PUT /api/user/profile
const updateProfile = async (req, res) => {
  try {
    const { name, kingdom } = req.body;

    if (!name || !kingdom) {
      return res.status(400).json({ message: 'Wizard Name and Kingdom cannot be empty.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: { name, kingdom } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Wizard not found.' });
    }

    res.status(200).json({
      message: 'Profile updated successfully.',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to rewrite profile scroll.' });
  }
};

// POST /api/user/questionnaire
const submitQuestionnaire = async (req, res) => {
  try {
    const answers = req.body;
    const { name, age, kingdom, education, favElement, strength, favSubject, companion, weapon, aura } = answers;

    if (!name || !age || !kingdom || !education || !favElement || !strength || !favSubject || !companion || !weapon || !aura) {
      return res.status(400).json({ message: 'All magical questions must be answered.' });
    }

    // Perform sorting calculation
    const destiny = calculateDestiny(answers);

    // Save responses & destiny directly to current authenticated user
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          name,
          age,
          kingdom,
          education,
          favElement,
          strength,
          favSubject,
          companion,
          weapon,
          aura,
          house: destiny.house,
          magicPower: destiny.magicPower,
          stats: destiny.stats,
          hasCompletedQuestionnaire: true
        }
      },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Wizard not found.' });
    }

    res.status(200).json({
      message: 'Destiny sorted and revealed!',
      user: updatedUser
    });

  } catch (error) {
    console.error('Questionnaire submission error:', error);
    res.status(500).json({ message: 'Sorting Crystal encountered an internal magical error.' });
  }
};

module.exports = { getProfile, updateProfile, submitQuestionnaire };
