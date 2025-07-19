import mongoose from "mongoose";

const ExploreProjectSchema = new mongoose.Schema({
  type: {
    type: String, // "recent", "case", "open", or "published"
    required: true,
  },
  title: String,
  imageUrl: String, // ✅ Renamed to make it clear this stores the uploaded image path
  desc: String,
  tech: [String],
  techClasses: [String],
  live: String,
  github: String,
  details: String,
});

export const ExploreProject = mongoose.model(
  "ExploreProject",
  ExploreProjectSchema
);
