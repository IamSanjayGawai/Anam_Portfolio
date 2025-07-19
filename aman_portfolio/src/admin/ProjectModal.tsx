import { useRef, type ChangeEvent } from "react";
import axios from "axios";
import {
  Trash2,
  Save,
  X,
  Upload,
  FileImage,
} from "lucide-react";



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

type ProjectModalProps = {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  editingProject: Project | null;
  setEditingProject: React.Dispatch<React.SetStateAction<Project | null>>;
};



const ProjectModal: React.FC<ProjectModalProps> = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  editingProject,
  setEditingProject

})  => {

    const projectFileInputRef = useRef<HTMLInputElement>(null);


    const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Pick<ProjectFormData, "tech" | "techClasses">
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProjectImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerProjectFileInput = () => {
    projectFileInputRef.current?.click();
  };

  const removeProjectImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
    if (projectFileInputRef.current) {
      projectFileInputRef.current.value = "";
    }
  };

    const resetForm = () => {
    setFormData({
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
    setEditingProject(null);
    setShowForm(false);
  };

  
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("type", formData.type);
    form.append("title", formData.title);
    form.append("desc", formData.desc);
    form.append("tech", JSON.stringify(formData.tech));
    form.append("techClasses", JSON.stringify(formData.techClasses));
    form.append("live", formData.live);
    form.append("github", formData.github);
    form.append("details", formData.details);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      if (editingProject) {
        // ⚠️ You can't use PUT with FormData by default — better use POST for updates too,
        // or use POST with a `_method=PUT` convention if your backend handles it.
        await axios.put(
          `http://localhost:4000/api/explore/update/${editingProject._id}`,
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post("http://localhost:4000/api/explore/create", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      alert(`Project ${editingProject ? "updated" : "created"} successfully!`);
    } catch (err) {
      console.error("Failed to submit project:", err);
      alert("There was an error submitting the project.");
    }
  };

  return (
    <>
    
      {/* Project Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-white hover:text-gray-300 p-1 hover:bg-gray-800 rounded-full transition-colors"
                    title="Close form"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="recent">Recent</option>
                      <option value="case">Case</option>
                      <option value="open">Open</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* image upload start */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Project Image
                    </label>

                    {/* Hidden file input */}
                    <input
                      ref={projectFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageUpload}
                      className="hidden"
                    />

                    {/* Image preview or upload area */}
                    {formData.imagePreview ? (
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Project preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={triggerProjectFileInput}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                            title="Change image"
                          >
                            <Upload size={16} />
                          </button>
                          <button
                            onClick={removeProjectImage}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                            title="Remove image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={triggerProjectFileInput}
                        className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-colors"
                      >
                        <FileImage size={48} className="text-gray-500 mb-2" />
                        <p className="text-gray-400 text-center">
                          Click to upload profile image
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                  {/* image upload end */}

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Description
                    </label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tech"
                      value={formData.tech}
                      onChange={(e) => handleArrayInputChange(e, "tech")}
                      placeholder="React, Node.js, MongoDB"
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Tech Classes (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="techClasses"
                      value={formData.techClasses}
                      onChange={(e) => handleArrayInputChange(e, "techClasses")}
                      placeholder="text-blue-500, text-green-500, text-red-500"
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Live URL
                    </label>
                    <input
                      type="url"
                      name="live"
                      value={formData.live}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Details
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 transition-colors"
                    >
                      <Save size={16} />
                      {editingProject ? "Update" : "Create"} Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

    </>
  )
}

export default ProjectModal