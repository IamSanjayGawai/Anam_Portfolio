import {Skill} from "../model/Skill.js";

// Create a new skill category
export const createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error("❌ Error creating skill:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    console.error("❌ Error fetching skills:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a skill category
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Skill.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Skill not found" });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating skill:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a skill category
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Skill.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting skill:", err);
    res.status(500).json({ message: "Server error" });
  }
};
