require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Verification Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Magic seal is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden. The seal has expired or is invalid.' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// House Sorting and Destiny Generator Algorithm
function calculateDestiny(answers) {
  const { favElement, strength, favSubject, companion, weapon, aura } = answers;
  
  let scores = {
    Aetherion: 0,
    Ignisaur: 0,
    Terraflora: 0,
    Celestia: 0
  };

  // Element Scores
  if (favElement === 'Lightning' || favElement === 'Moon') scores.Aetherion += 3;
  if (favElement === 'Fire') scores.Ignisaur += 3;
  if (favElement === 'Nature' || favElement === 'Water') scores.Terraflora += 2;
  if (favElement === 'Ice' || favElement === 'Water') scores.Celestia += 2;

  // Strength Scores
  if (strength === 'Curious') scores.Aetherion += 3;
  if (strength === 'Leader') scores.Ignisaur += 3;
  if (strength === 'Patient') scores.Terraflora += 3;
  if (strength === 'Creative') scores.Celestia += 3;
  if (strength === 'Problem Solver') { scores.Terraflora += 2; scores.Aetherion += 1; }
  if (strength === 'Fast Learner') { scores.Ignisaur += 2; scores.Celestia += 1; }

  // Subject Scores
  if (favSubject === 'Ancient Runes') scores.Aetherion += 3;
  if (favSubject === 'Defense' || favSubject === 'Flying') scores.Ignisaur += 3;
  if (favSubject === 'Beast Care' || favSubject === 'Potion Making') scores.Terraflora += 3;
  if (favSubject === 'Spell Crafting') scores.Celestia += 3;

  // Companion Scores
  if (companion === 'Owl' || companion === 'Fox') scores.Aetherion += 2;
  if (companion === 'Dragon' || companion === 'Wolf') scores.Ignisaur += 2;
  if (companion === 'Unicorn') scores.Terraflora += 2;
  if (companion === 'Black Cat') scores.Celestia += 2;

  // Weapon Scores
  if (weapon === 'Crystal Staff' || weapon === 'Spell Book') scores.Aetherion += 2;
  if (weapon === 'Rune Sword') scores.Ignisaur += 2;
  if (weapon === 'Magic Orb' || weapon === 'Magic Wand') scores.Terraflora += 2;
  if (weapon === 'Spell Book' || weapon === 'Magic Orb') scores.Celestia += 2;

  // Aura Scores
  if (aura === 'Purple') scores.Aetherion += 3;
  if (aura === 'Red') scores.Ignisaur += 3;
  if (aura === 'Green') scores.Terraflora += 3;
  if (aura === 'Blue') scores.Celestia += 3;
  if (aura === 'Gold') { scores.Ignisaur += 1; scores.Terraflora += 1; scores.Celestia += 1; }

  // Find max scoring house
  let selectedHouse = 'Aetherion';
  let maxScore = -1;
  for (const house in scores) {
    if (scores[house] > maxScore) {
      maxScore = scores[house];
      selectedHouse = house;
    }
  }

  // Generate Stats dynamically based on house
  let stats = { leadership: 50, wisdom: 50, creativity: 50, bravery: 50 };
  
  if (selectedHouse === 'Ignisaur') {
    stats.bravery = Math.floor(Math.random() * 15) + 85; // 85-99
    stats.leadership = Math.floor(Math.random() * 15) + 80; // 80-94
    stats.wisdom = Math.floor(Math.random() * 20) + 60; // 60-79
    stats.creativity = Math.floor(Math.random() * 20) + 55; // 55-74
  } else if (selectedHouse === 'Aetherion') {
    stats.wisdom = Math.floor(Math.random() * 15) + 85;
    stats.creativity = Math.floor(Math.random() * 15) + 75;
    stats.bravery = Math.floor(Math.random() * 20) + 60;
    stats.leadership = Math.floor(Math.random() * 20) + 60;
  } else if (selectedHouse === 'Terraflora') {
    stats.wisdom = Math.floor(Math.random() * 15) + 80;
    stats.leadership = Math.floor(Math.random() * 20) + 60;
    stats.creativity = Math.floor(Math.random() * 15) + 70;
    stats.bravery = Math.floor(Math.random() * 15) + 75;
  } else { // Celestia
    stats.creativity = Math.floor(Math.random() * 15) + 85;
    stats.wisdom = Math.floor(Math.random() * 15) + 80;
    stats.bravery = Math.floor(Math.random() * 25) + 55;
    stats.leadership = Math.floor(Math.random() * 20) + 60;
  }

  // Modifiers based on strength selection
  if (strength === 'Leader') stats.leadership = Math.min(100, stats.leadership + 5);
  if (strength === 'Creative') stats.creativity = Math.min(100, stats.creativity + 5);
  if (strength === 'Curious') stats.wisdom = Math.min(100, stats.wisdom + 5);
  if (strength === 'Problem Solver') stats.wisdom = Math.min(100, stats.wisdom + 5);

  // Magic Power percentage calculation
  let avgStats = (stats.leadership + stats.wisdom + stats.creativity + stats.bravery) / 4;
  let magicPower = Math.min(99, Math.max(70, Math.floor(avgStats + Math.random() * 6 - 3)));

  return {
    house: selectedHouse,
    magicPower,
    stats
  };
}

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All spellbook fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Spells do not match.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This Wizard ID is already registered.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();

    // Create token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'Wizard registered successfully.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        hasCompletedQuestionnaire: false
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Failed to complete registration incantation.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both Wizard ID (Email) and Secret Spell (Password).' });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No registered wizard with this ID.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid spell. The barriers remain locked.' });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      message: 'Welcome to the Academy.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hasCompletedQuestionnaire: user.hasCompletedQuestionnaire
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Magical verification service failed.' });
  }
});

// Profile Routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
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
});

app.put('/api/user/profile', authenticateToken, async (req, res) => {
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
});

// Questionnaire Results Route
app.post('/api/user/questionnaire', authenticateToken, async (req, res) => {
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
});

// Start Server
app.listen(PORT, () => {
  console.log(`Bodha Wizard Academy API listening on http://localhost:${PORT}`);
});
