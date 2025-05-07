// filepath: /Users/admin/Documents/angular/final-project/server/models/Interaction.js
import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true }, // The ID of the user
        movieId: { type: String, required: true }, // The ID of the movie
        rating: { type: Number, min: 0, max: 10 }, // User's rating for the movie
        comment: { type: String }, // User's comment about the movie
        seen: { type: Boolean, default: false }, // Whether the user has seen the movie
        interested: { type: Boolean, default: false }, // Whether the user is interested in seeing the movie
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Interaction = mongoose.model("Interaction", interactionSchema);
export default Interaction;