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
  console.log("Received request to create or update user preferences");
  console.log("Request body:", req.body);
  const { userId, preferences } = req.body;
  if (!userId || !preferences) {
    return res.status(400).json({ Error: "userId and preferences are required" });
  }

  try {
    const pref = await UserPreference.findOneAndUpdate(
      { userId },
      { preferences },
      // Use upsert to create a new document if it doesn't exist
      { upsert: true, new: true }
    );
    console.log("User preferences saved:", pref);
    res.json(pref);
  } catch (err) {
    console.error("Error saving user preferences:", err);
    res.status(500).json({ Error: err.message });
  }
});

// Get user preferences by userId
app.get('/preferences/:userId', async (req, res) => {
  console.log(`Received request for user preferences for userId: ${req.params.userId}`);

  try {
    const pref = await UserPreference.findOne({ userId: req.params.userId });
    if (!pref) {
      console.log(`No preferences found for userId: ${req.params.userId}`);
      return res.status(404).json({ error: "Not found" });
    }
    console.log("User preferences retrieved:", pref);
    res.json(pref);
  } catch (err) {
    console.error("Error retrieving user preferences:", err);
    res.status(500).json({ Error: err.message });
  }
});

// Delete user preferences by userId
app.delete('/preferences/:userId', async (req, res) => {
  console.log(`Received request to delete user preferences for userId: ${req.params.userId}`);
  try {
    const result = await UserPreference.deleteOne({ userId: req.params.userId });
    if (result.deletedCount === 0) {
      console.log(`No preferences found to delete for userId: ${req.params.userId}`);
      return res.status(404).json({ error: "Not found" });
    }
    console.log(`Preferences deleted for userId: ${req.params.userId}`);
    res.json({ message: "Preferences deleted" });
  } catch (err) {
    console.error("Error deleting user preferences:", err);
    res.status(500).json({ Error: err.message });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
