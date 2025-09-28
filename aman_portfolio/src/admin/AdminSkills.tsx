import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Save, PlusCircle, Edit3, Trash2 } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
}

interface Skill {
  _id?: string;
  title: string;
  icon: string;
  items: SkillItem[];
}

interface AdminSkillsProps {
  showSkills: boolean;
  setShowSkills: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSkills: React.FC<AdminSkillsProps> = ({ showSkills, setShowSkills }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState<Skill>({
    title: "",
    icon: "⚡",
    items: [{ name: "", level: 0 }],
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const backendUrl = import.meta.env.VITE_MONGODB_URI;

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/skills`);
      setSkills(Array.isArray(res.data) ? res.data : res.data.skills || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    if (showSkills) fetchSkills();
  }, [showSkills]);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
    const { name, value } = e.target;
    if (idx !== undefined) {
      const newItems = [...form.items];
      (newItems[idx] as any)[name] = name === "level" ? Number(value) : value;
      setForm({ ...form, items: newItems });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addSkillItem = () => {
    setForm({ ...form, items: [...form.items, { name: "", level: 0 }] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${backendUrl}/api/skills/${editingId}`, form);
      } else {
        await axios.post(`${backendUrl}/api/skills`, form);
      }
      setForm({ title: "", icon: "⚡", items: [{ name: "", level: 0 }] });
      setEditingId(null);
      fetchSkills();
    } catch (err) {
      console.error("❌ Save error:", err);
    }
  };

  const handleEdit = (skill: Skill) => {
    setForm(skill);
    setEditingId(skill._id!);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${backendUrl}/api/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  if (!showSkills) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editingId ? "Edit Skill Category" : "Add Skill Category"}
          </h2>
          <button
            onClick={() => setShowSkills(false)}
            className="text-white hover:text-gray-300 p-1 hover:bg-gray-800 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Skill Category Title"
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            required
          />
          <input
            type="text"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="Icon (emoji or string)"
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
          />

          <div className="space-y-3">
            {form.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleChange(e, idx)}
                  placeholder="Skill Name"
                  className="flex-1 p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
                <input
                  type="number"
                  name="level"
                  value={item.level}
                  onChange={(e) => handleChange(e, idx)}
                  placeholder="Level %"
                  className="w-24 p-2 bg-gray-800 text-white border border-gray-700 rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSkillItem}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <PlusCircle size={16} /> Add Item
            </button>
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
          >
            <Save size={16} />
            {editingId ? "Update Skill" : "Add Skill"}
          </button>
        </form>

        {/* Skills List */}
        <div className="grid gap-4">
          {skills?.length > 0 ? (
            skills.map((skill) => (
              <div
                key={skill._id}
                className="p-4 rounded-lg border border-gray-700 bg-gray-800 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-white">
                    {skill.icon} {skill.title}
                  </h3>
                  <ul className="ml-4 text-sm text-gray-300">
                    {skill.items.map((i, idx) => (
                      <li key={idx}>
                        {i.name} – {i.level}%
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id!)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No skills found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;
