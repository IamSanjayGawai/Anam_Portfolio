// import { useState, useEffect  } from "react";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
// } from "lucide-react";
// import axios from "axios";
// import ProfileModal from "./ProfileModal";
// import AdminHeader from "../components/AdminHeader";
// import ProjectModal from "./ProjectModal";
// import ResumeModal from "./ResumeModal";

// type Project = {
//   _id: string;
//   type: string;
//   title: string;
//   imageUrl: string | null; // ✅ match backend field!
//   imagePreview: string | null;
//   desc: string;
//   tech: string[];
//   techClasses: string[];
//   live: string;
//   github: string;
//   details: string;
// };

// type ProjectFormData = {
//   type: string;
//   title: string;
//   image: File | null;
//   imagePreview: string | null;
//   desc: string;
//   tech: string;
//   techClasses: string;
//   live: string;
//   github: string;
//   details: string;
// };

// const AddProject = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [showResume, setShowResume] = useState(false)
//   const [editingProject, setEditingProject] = useState<Project | null>(null);

//   const [formData, setFormData] = useState<ProjectFormData>({
//     type: "recent",
//     title: "",
//     image: null,
//     imagePreview: null,
//     desc: "",
//     tech: "",
//     techClasses: "",
//     live: "",
//     github: "",
//     details: "",
//   });

//   console.log(projects, "projects");
//   const backendUrl = import.meta.env.VITE_MONGODB_URI;

//   const handleGetProject = async () => {
//     let response = await axios.get(`${backendUrl}/api/explore/get`);
//     console.log(response.data, "reposne data");
//     setProjects(response.data);
//   };

//   // Sample data for demonstration
//   useEffect(() => {
//     handleGetProject();
//   }, []);

//   const handleEdit = (project: Project) => {
//     setEditingProject(project);
//     setFormData({
//       type: project.type,
//       title: project.title,
//       image: null,
//       // imagePreview: project?.imageUrl || null,                       //  when  mongo image url uses
//       imagePreview: project?.imageUrl
//         ? `${backendUrl}/${project.imageUrl}`
//         : null,
//       desc: project.desc,
//       tech: project.tech.join(", "),
//       techClasses: project.techClasses.join(", "),
//       live: project.live,
//       github: project.github,
//       details: project.details,
//     });

//     setShowForm(true);
//   };

//   const handleDelete = async (id: string) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this project?"
//     );
//     if (!confirmDelete) return;

//     try {
//       // Simulated delete - replace with actual axios call
//       await axios.delete(`${backendUrl}/api/explore/delete/${id}`);
//       setProjects((prev) => prev.filter((p) => p._id !== id));
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
//     <>
//       {" "}
//       <AdminHeader />
//       <div className="min-h-screen bg-black p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold text-white">
//               Project Admin Dashboard
//             </h1>
//             <div className="flex gap-3">
              
//                  <button
//                 onClick={() => setShowResume(true)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 Update Resume
//               </button>
//               <button
//                 onClick={() => setShowProfile(true)}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 Update Profile
//               </button>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 <Plus size={20} />
//                 Add New Project
//               </button>
//             </div>
//           </div>

//           <ProjectModal
//             showForm={showForm}
//             setShowForm={setShowForm}
//             formData={formData}
//             setFormData={setFormData}
//             editingProject={editingProject}
//             setEditingProject={setEditingProject}
//           />
//           <ProfileModal
//             showProfile={showProfile}
//             setShowProfile={setShowProfile}
//           />

//           <ResumeModal showResume={showResume} setShowResume={setShowResume} />

//           {/* Projects Table */}
//           <div className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Projects ({projects.length})
//               </h2>
//             </div>

//             {projects.length === 0 ? (
//               <div className="p-12 text-center text-gray-500">
//                 <div className="text-6xl mb-4">📁</div>
//                 <h3 className="text-lg font-medium mb-2">No projects yet</h3>
//                 <p>Click "Add New Project" to get started</p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-600">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                         Project
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                         Type
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                         Technologies
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                         Links
//                       </th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-gray-900 divide-y divide-gray-200">
//                     {projects.map((project) => (
//                       <tr key={project._id} className="hover:bg-gray-800">
//                         {/* <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           {(typeof project.imageUrl === "string" &&
//                             project.imageUrl) ||
//                           project.imagePreview ? (
//                             <img
//                               src={
//                                 typeof project.imageUrl === "string"
//                                   ? project.imageUrl
//                                   : project.imagePreview || ""
//                               }
//                               alt={project.title}
//                               className="h-12 w-12 rounded-lg object-cover mr-4"
//                             />
//                           ) : null}
//                           <div>
//                             <div className="text-sm font-medium text-white">
//                               {project.title || "Untitled"}
//                             </div>
//                             <div className="text-sm text-gray-500 line-clamp-2">
//                               {project.desc}
//                             </div>
//                           </div>
//                         </div>
//                       </td> */}

//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             {project.imagePreview || project.imageUrl ? (
//                               <img
//                                 src={
//                                   project.imagePreview
//                                     ? project.imagePreview
//                                     : project.imageUrl?.startsWith("http")
//                                     ? project.imageUrl
//                                     : `${backendUrl}/${project.imageUrl?.replace(
//                                         /\\/g,
//                                         "/"
//                                       )}`
//                                 }
//                                 alt={project.title || "Project Image"}
//                                 className="h-12 w-12 rounded-lg object-cover mr-4"
//                               />
//                             ) : null}

//                             <div>
//                               <div className="text-sm font-medium text-white">
//                                 {project.title || "Untitled"}
//                               </div>
//                               <div className="text-sm text-gray-500 line-clamp-2">
//                                 {project.desc || "No description available."}
//                               </div>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-6 py-4">
//                           <span
//                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
//                               project.type
//                             )}`}
//                           >
//                             {project.type}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex flex-wrap gap-1">
//                             {Array.isArray(project.tech) &&
//                               project.tech.map((tech, index) => (
//                                 <span
//                                   key={index}
//                                   className="inline-flex px-2 py-1 text-xs bg-gray-700 text-gray-200 rounded"
//                                 >
//                                   {tech}
//                                 </span>
//                               ))}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex gap-2">
//                             {project.live && (
//                               <a
//                                 href={project.live}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-400 hover:text-blue-300"
//                                 title="View Live"
//                               >
//                                 <Eye size={16} />
//                               </a>
//                             )}
//                             {project.github && (
//                               <a
//                                 href={project.github}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-gray-400 hover:text-gray-300"
//                                 title="View GitHub"
//                               >
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="currentColor"
//                                   viewBox="0 0 20 20"
//                                 >
//                                   <path
//                                     fillRule="evenodd"
//                                     d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
//                                     clipRule="evenodd"
//                                   />
//                                 </svg>
//                               </a>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               onClick={() => handleEdit(project)}
//                               className="text-blue-400 hover:text-blue-300 p-1"
//                               title="Edit"
//                             >
//                               <Edit size={16} />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(project._id)}
//                               className="text-red-400 hover:text-red-300 p-1"
//                               title="Delete"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddProject;



import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import axios from "axios";
import ProfileModal from "./ProfileModal";
import AdminHeader from "../components/AdminHeader";
import ProjectModal from "./ProjectModal";
import ResumeModal from "./ResumeModal";

type Project = {
  _id: string;
  type: string;
  title: string;
  imageUrl: string | null;
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
  const [showResume, setShowResume] = useState(false);
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

  const backendUrl = import.meta.env.VITE_MONGODB_URI;

  const handleGetProject = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/explore/get`);
      console.log("response data:", response.data);

      // Handle both array and object responses
      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else if (Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      type: project.type,
      title: project.title,
      image: null,
      imagePreview: project?.imageUrl
        ? `${backendUrl}/${project.imageUrl}`
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
      await axios.delete(`${backendUrl}/api/explore/delete/${id}`);
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
                    {Array.isArray(projects) &&
                      projects.map((project) => (
                        <tr key={project._id} className="hover:bg-gray-800">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {project.imagePreview || project.imageUrl ? (
                                <img
                                  src={
                                    project.imagePreview
                                      ? project.imagePreview
                                      : project.imageUrl?.startsWith("http")
                                      ? project.imageUrl
                                      : `${backendUrl}/${project.imageUrl?.replace(
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
