import fs from "fs";
import path from "path";


// Resume upload
export const uploadResumeController = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No resume uploaded" });
  }
  console.log("Resume uploaded:", req.file);
  res.json({ message: "Resume uploaded successfully!" });
};

// Resume download
export const downloadResumeController = (req, res) => {
  const filePath = path.resolve("uploads/resume.pdf");
  if (fs.existsSync(filePath)) {
    res.download(filePath, "resume.pdf");
  } else {
    res.status(404).json({ error: "No resume found" });
  }
};
