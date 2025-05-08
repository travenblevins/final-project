// models/User.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    seenMovies: [movieSchema],
    interestedMovies: [movieSchema]
});

export default mongoose.model('User', userSchema);
