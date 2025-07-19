import React, { useState, useEffect, useRef, type ChangeEvent } from "react";
import axios from "axios";
import { Upload, Trash2, Save, X, FileImage } from "lucide-react";

type ProfileModalProps = {
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
};

type AuthorData = {
  name: string;
  about: string;
  headline: string;
  role: string;
  image: File | null;
  imagePreview: string | null;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ showProfile, setShowProfile }) => {
  const [authorData, setAuthorData] = useState<AuthorData>({
    name: "",
    about: "",
    headline: "",
    role: "",
    image: null,
    imagePreview: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load existing author details if any
    const fetchAuthor = async () => {
      const res = await axios.get("http://localhost:4000/api/authors");
      const data = res.data;
      if (data) {
        setAuthorData((prev) => ({
          ...prev,
          name: data.name,
          about: data.about,
          headline: data.headline,
          role: data.role,
          imagePreview: data.image ? `http://localhost:4000/${data.image}` : null,
        }));
      }
    };
    if (showProfile) {
      fetchAuthor();
    }
  }, [showProfile]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuthorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be under 5MB");
        return;
      }
      setAuthorData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const removeImage = () => {
    setAuthorData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!authorData.name.trim()) {
      alert("Name is required");
      return;
    }

    const form = new FormData();
    form.append("name", authorData.name);
    form.append("about", authorData.about);
    form.append("headline", authorData.headline);
    form.append("role", authorData.role);
    if (authorData.image) {
      form.append("image", authorData.image);
    }

    await axios.post("http://localhost:4000/api/authors", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Profile saved!");
    setShowProfile(false);
  };

  return (
    showProfile && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Update About Author</h2>
            <button
              onClick={() => setShowProfile(false)}
              className="text-white hover:text-gray-300 p-1 hover:bg-gray-800 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {authorData.imagePreview ? (
              <div className="relative">
                <img
                  src={authorData.imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={triggerFileInput}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  >
                    <Upload size={16} />
                  </button>
                  <button
                    onClick={removeImage}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={triggerFileInput}
                className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-colors"
              >
                <FileImage size={48} className="text-gray-500 mb-2" />
                <p className="text-gray-400 text-center">Click to upload image</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={authorData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Headline</label>
              <input
                type="text"
                name="headline"
                value={authorData.headline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={authorData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">About</label>
              <textarea
                name="about"
                value={authorData.about}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md resize-vertical"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2"
            >
              <Save size={16} />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileModal;
