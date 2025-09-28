import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, default: "⚡" },
  items: [
    {
      name: { type: String, required: true },
      level: { type: Number, required: true, min: 0, max: 100 }
    }
  ]
}, { timestamps: true });

export const Skill = mongoose.model('Skill', skillSchema)
