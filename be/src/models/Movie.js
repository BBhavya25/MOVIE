import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: Number,
  rating: Number,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Movie", movieSchema);
