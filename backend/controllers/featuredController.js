import { FeaturedProject } from "../model/FeaturedProject.js";

export const getAllFeatured = async (req, res) => {
  const data = await FeaturedProject.find();
  res.json(data);
};

export const createFeatured = async (req, res) => {
  const project = new FeaturedProject(req.body);
  await project.save();
  res.status(201).json(project);
};

export const updateFeatured = async (req, res) => {
  const updated = await FeaturedProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteFeatured = async (req, res) => {
  await FeaturedProject.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
