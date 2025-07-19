import mongoose from "mongoose";

const FeaturedProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  shortDesc: String,
  fullDesc: String,
  tech: [String],
  techClasses: [String],

  // 👇 Inline definition for links array
  links: [
    {
      type: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

export const FeaturedProject = mongoose.model("FeaturedProject", FeaturedProjectSchema);
