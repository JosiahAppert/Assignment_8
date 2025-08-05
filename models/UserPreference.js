import mongoose from 'mongoose';

const UserPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  preferences: { type: Object, default: {} }
}, {
  timestamps: true
});

export default mongoose.model('UserPreference', UserPreferenceSchema);
