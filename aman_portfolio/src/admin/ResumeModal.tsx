import { Save, X, FileImage } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";

type ResumeModalProps = {
  showResume: Boolean;
  setShowResume: (show: boolean) => void;
};
const backendUrl = import.meta.env.VITE_MONGODB_URI;
const ResumeModal = ({ showResume, setShowResume }: ResumeModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      console.log("Selected file", file);
    }
  };

  const handleSave = async () => {
    if (resumeFile) {
      console.log("Uploading resume:", resumeFile);
     const formData = new FormData();
formData.append("resume", resumeFile); 

await axios.post(
  `${backendUrl}/api/files/upload-resume`,
  formData
 
);

    } else {
      console.log("No resume selected");
    }
  };

  return (
    showResume && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Update About Author
            </h2>
            <button
              onClick={() => setShowResume(false)}
              className="text-white hover:text-gray-300 p-1 hover:bg-gray-800 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChnage}
            />

            <div
              onClick={handleBoxClick}
              className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-colors"
            >
              <FileImage size={48} className="text-gray-500 mb-2" />
              <p className="text-gray-400 text-center">
                Click to upload Resume
              </p>
            </div>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2"
            >
              <Save size={16} />
              Save Resume
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ResumeModal;

{
  /* 
       {authorData.imagePreview ? (
              <div className="relative">
                <img
       
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
           
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  >
                    <Upload size={16} />
                  </button>
                  <button
          
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div

                className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-colors"
              >
                <FileImage size={48} className="text-gray-500 mb-2" />
                <p className="text-gray-400 text-center">Click to upload image</p>
              </div>
            )} */
}
