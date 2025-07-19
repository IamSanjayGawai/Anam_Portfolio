// import { ExploreProject } from "../model/ExploreProject.js";

// export const getAllExplore = async (req, res) => {
//   const data = await ExploreProject.find();
//   res.json(data);
// };

// export const createExplore = async (req, res) => {
//   const project = new ExploreProject(req.body);
//   console.log(project, "project data body")
//   await project.save();
//   res.status(201).json(project);
// };

// export const updateExplore = async (req, res) => {
//   const updated = await ExploreProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// };

// export const deleteExplore = async (req, res) => {
//   await ExploreProject.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };



import { ExploreProject } from "../model/ExploreProject.js";

// GET all
export const getAllExplore = async (req, res) => {
  const data = await ExploreProject.find();
  res.json(data);
};

export const createExplore = async (req, res) => {
  try {
    console.log(req.body); // debug
    const {
      type,
      title,
      desc,
      tech,
      techClasses,
      live,
      github,
      details,
    } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const project = new ExploreProject({
      type,
      title,
      imageUrl,
      desc,
      tech: JSON.parse(tech),
      techClasses: JSON.parse(techClasses),
      live,
      github,
      details,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE with image
export const updateExplore = async (req, res) => {
  try {
    const {
      type,
      title,
      desc,
      tech,
      techClasses,
      live,
      github,
      details,
    } = req.body;

    const updateFields = {
      type,
      title,
      desc,
      tech: JSON.parse(tech),
      techClasses: JSON.parse(techClasses),
      live,
      github,
      details,
    };

    if (req.file) {
      updateFields.imageUrl = req.file.path;
    }

    const updated = await ExploreProject.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE
export const deleteExplore = async (req, res) => {
  await ExploreProject.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
