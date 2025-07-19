import { useState, useEffect, useRef, type ChangeEvent } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Upload,
  FileImage,
} from "lucide-react";
import axios from "axios";
import ProfileModal from "./ProfileModal";
import AdminHeader from "../components/AdminHeader";
import ProjectModal from "./ProjectModal";
import ResumeModal from "./ResumeModal";

type Project = {
  _id: string;
  type: string;
  title: string;
  imageUrl: string | null; // ✅ match backend field!
  imagePreview: string | null;
  desc: string;
  tech: string[];
  techClasses: string[];
  live: string;
  github: string;
  details: string;
};

type ProjectFormData = {
  type: string;
  title: string;
  image: File | null;
  imagePreview: string | null;
  desc: string;
  tech: string;
  techClasses: string;
  live: string;
  github: string;
  details: string;
};

const AddProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showResume, setShowResume] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<ProjectFormData>({
    type: "recent",
    title: "",
    image: null,
    imagePreview: null,
    desc: "",
    tech: "",
    techClasses: "",
    live: "",
    github: "",
    details: "",
  });

  console.log(projects, "projects");

  const handleGetProject = async () => {
    let response = await axios.get("http://localhost:4000/api/explore/get");
    console.log(response.data, "reposne data");
    setProjects(response.data);
  };

  // Sample data for demonstration
  useEffect(() => {
    handleGetProject();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      type: project.type,
      title: project.title,
      image: null,
      // imagePreview: project?.imageUrl || null,                       //  when  mongo image url uses
      imagePreview: project?.imageUrl
        ? `http://localhost:4000/${project.imageUrl}`
        : null,
      desc: project.desc,
      tech: project.tech.join(", "),
      techClasses: project.techClasses.join(", "),
      live: project.live,
      github: project.github,
      details: project.details,
    });

    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      // Simulated delete - replace with actual axios call
      await axios.delete(`http://localhost:4000/api/explore/delete/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      recent: "bg-blue-100 text-blue-800",
      case: "bg-purple-100 text-purple-800",
      open: "bg-green-100 text-green-800",
      published: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      {" "}
      <AdminHeader />
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Project Admin Dashboard
            </h1>
            <div className="flex gap-3">
              
                 <button
                onClick={() => setShowResume(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                Update Resume
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                Update Profile
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Add New Project
              </button>
            </div>
          </div>

          <ProjectModal
            showForm={showForm}
            setShowForm={setShowForm}
            formData={formData}
            setFormData={setFormData}
            editingProject={editingProject}
            setEditingProject={setEditingProject}
          />
          <ProfileModal
            showProfile={showProfile}
            setShowProfile={setShowProfile}
          />

          <ResumeModal showResume={showResume} setShowResume={setShowResume} />

          {/* Projects Table */}
          <div className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Projects ({projects.length})
              </h2>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                <p>Click "Add New Project" to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Technologies
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Links
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project._id} className="hover:bg-gray-800">
                        {/* <td className="px-6 py-4">
                        <div className="flex items-center">
                          {(typeof project.imageUrl === "string" &&
                            project.imageUrl) ||
                          project.imagePreview ? (
                            <img
                              src={
                                typeof project.imageUrl === "string"
                                  ? project.imageUrl
                                  : project.imagePreview || ""
                              }
                              alt={project.title}
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                            />
                          ) : null}
                          <div>
                            <div className="text-sm font-medium text-white">
                              {project.title || "Untitled"}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {project.desc}
                            </div>
                          </div>
                        </div>
                      </td> */}

                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {project.imagePreview || project.imageUrl ? (
                              <img
                                src={
                                  project.imagePreview
                                    ? project.imagePreview
                                    : project.imageUrl?.startsWith("http")
                                    ? project.imageUrl
                                    : `http://localhost:4000/${project.imageUrl?.replace(
                                        /\\/g,
                                        "/"
                                      )}`
                                }
                                alt={project.title || "Project Image"}
                                className="h-12 w-12 rounded-lg object-cover mr-4"
                              />
                            ) : null}

                            <div>
                              <div className="text-sm font-medium text-white">
                                {project.title || "Untitled"}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-2">
                                {project.desc || "No description available."}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                              project.type
                            )}`}
                          >
                            {project.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(project.tech) &&
                              project.tech.map((tech, index) => (
                                <span
                                  key={index}
                                  className="inline-flex px-2 py-1 text-xs bg-gray-700 text-gray-200 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300"
                                title="View Live"
                              >
                                <Eye size={16} />
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-300"
                                title="View GitHub"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(project)}
                              className="text-blue-400 hover:text-blue-300 p-1"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="text-red-400 hover:text-red-300 p-1"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;





// import { useState, useEffect, type ChangeEvent } from "react";
// import { Plus, Edit, Trash2, Save, X, Eye } from "lucide-react";
// import axios from "axios";

// type Project = {
//   _id: string;
//   type: string;
//   title: string;
//   image: string;
//   desc: string;
//   tech: string[];
//   techClasses: string[];
//   live: string;
//   github: string;
//   details: string;
// };

// const AddProject = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showProfile, setShowProfile] = useState(false)
//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [formData, setFormData] = useState({
//     type: "recent",
//     title: "",
//     image: "",
//     desc: "",
//     tech: "",
//     techClasses: "",
//     live: "",
//     github: "",
//     details: "",
//   });

//   console.log(projects, "projects");

//   const handleGetProject = async () => {
//     let response = await axios.get("http://localhost:4000/api/explore/get");
//     console.log(response.data, "reposne data");
//     setProjects(response.data);
//   };

//   // Sample data for demonstration
//   useEffect(() => {
//     handleGetProject();
//   }, []);

//   const handleInputChange = (e: { target: { name: any; value: any } }) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleArrayInputChange = (
//     e: ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       type: "recent",
//       title: "",
//       image: "",
//       desc: "",
//       tech: "",
//       techClasses: "",
//       live: "",
//       github: "",
//       details: "",
//     });
//     setEditingProject(null);
//     setShowForm(false);
//   };

//   const handleSubmit = async () => {
//     const projectData = {
//       ...formData,
//       tech: formData.tech
//         .split(",")
//         .map((t) => t.trim())
//         .filter((t) => t),
//       techClasses: formData.techClasses
//         .split(",")
//         .map((t) => t.trim())
//         .filter((t) => t),
//     };

//     try {
//       if (editingProject) {
//         // If editing, send a PUT or PATCH request (if your backend supports it)
//         await axios.put(
//           `http://localhost:4000/api/explore/update/${editingProject._id}`,
//           projectData
//         );
//         setProjects((prev) =>
//           prev.map((p) =>
//             p._id === editingProject._id
//               ? { ...projectData, _id: editingProject._id }
//               : p
//           )
//         );
//       } else {
//         // For creating a new project
//         const res = await axios.post(
//           "http://localhost:4000/api/explore/create",
//           projectData
//         );
//         setProjects((prev) => [...prev, res.data]); // Assuming the backend returns the new project
//       }

//       resetForm();
//     } catch (err) {
//       console.error("Failed to submit project:", err);
//       alert("There was an error submitting the project.");
//     }
//   };

//   const handleEdit = (project: Project) => {
//     setEditingProject(project);
//     setFormData({
//       type: project.type,
//       title: project.title,
//       image: project.image,
//       desc: project.desc,
//       tech: project.tech.join(", "),
//       techClasses: project.techClasses.join(", "),
//       live: project.live,
//       github: project.github,
//       details: project.details,
//     });
//     setShowForm(true);
//   };

//   // const handleDelete = (id:string) => {
//   //   if (window.confirm('Are you sure you want to delete this project?')) {
//   //     setProjects(prev => prev.filter(p => p._id !== id));
//   //   }
//   // };

//   const handleDelete = async (id: string) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this project?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:4000/api/explore/delete/${id}`);
//       setProjects((prev) => prev.filter((p) => p._id !== id)); // Update frontend list
//       alert("Project deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete project:", error);
//       alert("Failed to delete project. Please try again.");
//     }
//   };

//   const getTypeColor = (type: string) => {
//     const colors: Record<string, string> = {
//       recent: "bg-blue-100 text-blue-800",
//       case: "bg-purple-100 text-purple-800",
//       open: "bg-green-100 text-green-800",
//       published: "bg-orange-100 text-orange-800",
//     };
//     return colors[type] || "bg-gray-100 text-gray-800";
//   };

//   return (
//     <div className="min-h-screen bg-black p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white">
//             Project Admin Dashboard
//           </h1>
//           <div className="flex">

//             <button
//               onClick={() => setShowProfile(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//             >
//               Update Profile
//             </button>
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//           >
//             <Plus size={20} />
//             Add New Project
//           </button>
//           </div>
//         </div>

//         {/* Form Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-white">
//                   {editingProject ? "Edit Project" : "Add New Project"}
//                 </h2>
//                 <button
//                   onClick={resetForm}
//                   className="text-white hover:white p-1 hover:bg-gray-100 rounded-full transition-colors"
//                   title="Close form"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Type *
//                   </label>
//                   <select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="recent">Recent</option>
//                     <option value="case">Case</option>
//                     <option value="open">Open</option>
//                     <option value="published">Published</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Image URL
//                   </label>
//                   <input
//                     type="url"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Description
//                   </label>
//                   <textarea
//                     name="desc"
//                     value={formData.desc}
//                     onChange={handleInputChange}
//                     rows={3}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Technologies (comma-separated)
//                   </label>
//                   <input
//                     type="text"
//                     name="tech"
//                     value={formData.tech}
//                     onChange={(e) => handleArrayInputChange(e, "tech")}
//                     placeholder="React, Node.js, MongoDB"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Tech Classes (comma-separated)
//                   </label>
//                   <input
//                     type="text"
//                     name="techClasses"
//                     value={formData.techClasses}
//                     onChange={(e) => handleArrayInputChange(e, "techClasses")}
//                     placeholder="text-blue-500, text-green-500, text-red-500"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Live URL
//                   </label>
//                   <input
//                     type="url"
//                     name="live"
//                     value={formData.live}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     GitHub URL
//                   </label>
//                   <input
//                     type="url"
//                     name="github"
//                     value={formData.github}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-200 mb-1">
//                     Details
//                   </label>
//                   <textarea
//                     name="details"
//                     value={formData.details}
//                     onChange={handleInputChange}
//                     rows={4}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 transition-colors"
//                   >
//                     <Save size={16} />
//                     {editingProject ? "Update" : "Create"} Project
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//       {showProfile && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-white">
//                 {editingProject ? "Edit Project" : "Add New Project"}
//               </h2>
//               <button
//                 onClick={resetForm}
//                 className="text-white hover:text-gray-300 p-1 hover:bg-gray-800 rounded-full transition-colors"
//                 title="Close form"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {/* Image Upload Section */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-2">
//                   Project Image
//                 </label>

//                 {/* Hidden file input */}
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />

//                 {/* Image preview or upload area */}
//                 {formData.imagePreview ? (
//                   <div className="relative">
//                     <img
//                       src={formData.imagePreview}
//                       alt="Project preview"
//                       className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
//                     />
//                     <div className="absolute top-2 right-2 flex gap-2">
//                       <button
//                         onClick={triggerFileInput}
//                         className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
//                         title="Change image"
//                       >
//                         <Upload size={16} />
//                       </button>
//                       <button
//                         onClick={removeImage}
//                         className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
//                         title="Remove image"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div
//                     onClick={triggerFileInput}
//                     className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-colors"
//                   >
//                     <ImageIcon size={48} className="text-gray-500 mb-2" />
//                     <p className="text-gray-400 text-center">
//                       Click to upload project image
//                     </p>
//                     <p className="text-gray-500 text-sm mt-1">
//                       PNG, JPG, GIF up to 5MB
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Name Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter project name"
//                 />
//               </div>

//               {/* Description Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="desc"
//                   value={formData.desc}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
//                   placeholder="Enter project description"
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 transition-colors"
//                 >
//                   <Save size={16} />
//                   {editingProject ? "Update" : "Create"} Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//         {/* Projects Table */}
//         <div className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Projects ({projects.length})
//             </h2>
//           </div>

//           {projects.length === 0 ? (
//             <div className="p-12 text-center text-gray-500">
//               <div className="text-6xl mb-4">📁</div>
//               <h3 className="text-lg font-medium mb-2">No projects yet</h3>
//               <p>Click "Add New Project" to get started</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-600">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                       Project
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                       Technologies
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                       Links
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-gray-900 divide-y divide-gray-200">
//                   {projects.map((project) => (
//                     <tr key={project._id} className="hover:bg-gray-800">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           {project.image && (
//                             <img
//                               src={project.image}
//                               alt={project.title}
//                               className="h-12 w-12 rounded-lg object-cover mr-4"
//                             />
//                           )}
//                           <div>
//                             <div className="text-sm font-medium text-white">
//                               {project.title || "Untitled"}
//                             </div>
//                             <div className="text-sm text-gray-500 line-clamp-2">
//                               {project.desc}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
//                             project.type
//                           )}`}
//                         >
//                           {project.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         {Array.isArray(project.tech) &&
//                           project.tech.map((tech, index) => (
//                             <span
//                               key={index}
//                               className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
//                             >
//                               {tech}
//                             </span>
//                           ))}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex gap-2">
//                           {project.live && (
//                             <a
//                               href={project.live}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 hover:text-blue-800"
//                               title="View Live"
//                             >
//                               <Eye size={16} />
//                             </a>
//                           )}
//                           {project.github && (
//                             <a
//                               href={project.github}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-gray-600 hover:text-gray-800"
//                               title="View GitHub"
//                             >
//                               <svg
//                                 className="w-4 h-4"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </a>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <div className="flex justify-end gap-2">
//                           <button
//                             onClick={() => handleEdit(project)}
//                             className="text-blue-600 hover:text-blue-800 p-1"
//                             title="Edit"
//                           >
//                             <Edit size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(project._id)}
//                             className="text-red-600 hover:text-red-800 p-1"
//                             title="Delete"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProject;
