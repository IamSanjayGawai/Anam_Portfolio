// import { AboutAuthor } from "../model/AboutAuthor.js";

// // Get the single author (or all if needed)
// export const getAuthor = async (req, res) => {
//   try {
//     const author = await AboutAuthor.findOne();
//     res.json(author);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get author", error: err.message });
//   }
// };

// // Create only if no author exists
// export const createAuthor = async (req, res) => {
//   try {
//     const existing = await AboutAuthor.findOne();
//     if (existing) {
//       return res.status(400).json({ message: "An author already exists — update instead." });
//     }

//     const { name, about, headline, role, mission } = req.body;
//     const image = req.file ? req.file.path : "";

//     const newAuthor = new AboutAuthor({ name, about, headline, role, image, mission });
//     await newAuthor.save();

//     res.status(201).json(newAuthor);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to create author", error: err.message });
//   }
// };

// // Update the single author
// export const updateAuthor = async (req, res) => {
//   try {
//     const author = await AboutAuthor.findOne();
//     if (!author) {
//       return res.status(404).json({ message: "No author exists to update." });
//     }

//     const { name, about, headline, role, mission } = req.body;
//     const image = req.file ? req.file.path : author.image;

//     author.name = name || author.name;
//     author.about = about || author.about;
//     author.headline = headline || author.headline;
//     author.role = role || author.role;
//     author.image = image;
//     author.mission = mission || author.mission

//     await author.save();

//     res.json(author);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update author", error: err.message });
//   }
// };

// // Delete the single author (optional)
// export const deleteAuthor = async (req, res) => {
//   try {
//     const author = await AboutAuthor.findOne();
//     if (!author) {
//       return res.status(404).json({ message: "No author exists to delete." });
//     }

//     await AboutAuthor.deleteOne({ _id: author._id });

//     res.json({ message: "Author deleted successfully." });
//   } catch (err) {
//     res.status(400).json({ message: "Failed to delete author", error: err.message });
//   }
// };




import { AboutAuthor } from "../model/AboutAuthor.js";

// CREATE or UPDATE (only one author allowed)
export const createOrUpdateAuthor = async (req, res) => {
  try {
    const { name, about, headline, role } = req.body;

    let existing = await AboutAuthor.findOne();

    if (existing) {
      existing.name = name;
      existing.about = about;
      existing.headline = headline;
      existing.role = role;
      if (req.file) {
        existing.image = req.file.path; // or `req.file.filename` if you prefer
      }
      await existing.save();
      return res.status(200).json(existing);
    }

    const newAuthor = new AboutAuthor({
      name,
      about,
      headline,
      role,
      image: req.file ? req.file.path : "",
    });

    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    console.error("Error in createOrUpdateAuthor:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET (always returns the single author)
export const getAuthor = async (req, res) => {
  try {
    const author = await AboutAuthor.findOne();
    res.json(author);
  } catch (err) {
    console.error("Error in getAuthor:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE (delete the single author)
export const deleteAuthor = async (req, res) => {
  try {
    await AboutAuthor.deleteMany();
    res.json({ message: "Author deleted" });
  } catch (err) {
    console.error("Error in deleteAuthor:", err);
    res.status(500).json({ message: "Server error" });
  }
};
