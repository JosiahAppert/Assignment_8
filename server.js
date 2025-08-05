import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserPreference from './models/UserPreference.js';

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connected");

// Routes
// Create or update user preferences
app.post('/preferences', async (req, res) => {
  const { userId, preferences } = req.body;
  if (!userId || !preferences) {
    return res.status(400).json({ Error: "userId and preferences are required" });
  }

  try {
    const pref = await UserPreference.findOneAndUpdate(
      { userId },
      { preferences },
      { upsert: true, new: true }
    );
    res.json(pref);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

// Get user preferences by userId
app.get('/preferences/:userId', async (req, res) => {
  try {
    const pref = await UserPreference.findOne({ userId: req.params.userId });
    if (!pref) return res.status(404).json({ error: "Not found" });
    res.json(pref);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

// Delete user preferences by userId
app.delete('/preferences/:userId', async (req, res) => {
  try {
    const result = await UserPreference.deleteOne({ userId: req.params.userId });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Preferences deleted" });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
