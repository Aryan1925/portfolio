"use client";


import { useEffect,useRef, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Building2, Briefcase } from "lucide-react";

export default function ExperienceAdmin() {
  const [experience, setExperience] = useState([]);

  const [editingId, setEditingId] = useState(null);
  // const [expandedId, setExpandedId] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });

   const formRef = useRef(null);

  // FETCH
  useEffect(() => {
    const loadExperience = async () => {
      try {
        const res = await fetch("/api/experience");
        const data = await res.json();
        
        setExperience(data.data || []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load experience");
      }
    };

    loadExperience();
  }, []);

  // SUBMIT
  const handleSubmit = async () => {
    if (!form.company || !form.role || !form.duration) {
      return toast.error("Required fields missing");
    }

    const url = editingId
      ? `/api/experience/${editingId}`
      : "/api/experience";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    toast.success(editingId ? "Updated" : "Added");

    setForm({
      company: "",
      role: "",
      duration: "",
      description: "",
    });

    setEditingId(null);
    refresh();
  };

  const refresh = async () => {
    const res = await fetch("/api/experience");
    const data = await res.json();
    setExperience(data.data || []);
  };

  // EDIT
  const handleEdit = (e) => {
    setForm({
      company: e.company,
      role: e.role,
      duration: e.duration,
      description: e.description,
    });
    setEditingId(e._id);

    
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    refresh();
  };

return (
  <div ref={formRef}
  className="space-y-10">

    {/* HEADER */}
    <div>
      <h1 className="text-3xl font-bold">Experience</h1>
      <p className="text-gray-400 text-sm mt-1">
        Manage your work experience
      </p>
    </div>

    {/* FORM */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl">
      <h2 className="text-lg font-semibold mb-4">
        {editingId ? "Edit Experience" : "Add Experience"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          placeholder="Duration (e.g. 2023 - 2024)"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
          className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        rows={4}
        className="w-full mt-4 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <div className="flex gap-3 mt-5">
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition font-medium shadow-lg"
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({
                company: "",
                role: "",
                duration: "",
                description: "",
              });
            }}
            className="px-5 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>

    {/* LIST */}
    <div className="space-y-4">
      {experience.map((e) => (
        <div
          key={e._id}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-xl flex flex-col md:flex-row md:justify-between gap-4"
        >
          {/* LEFT */}
          <div className="space-y-2">

            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-blue-400" />
              <h2 className="text-lg font-semibold">
                {e.company}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Briefcase size={14} />
              <span>{e.role}</span>
              <span>•</span>
              <span>{e.duration}</span>
            </div>

            <p className="text-sm text-gray-300 mt-2 leading-relaxed">
              {e.description}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 items-start md:items-center">

            <button
              onClick={() => handleEdit(e)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg 
              bg-blue-500/10 text-blue-400 border border-blue-500/20 
              hover:bg-blue-500/20 transition"
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              onClick={() => {
                setDeleteId(e._id);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg 
              bg-red-500/10 text-red-400 border border-red-500/20 
              hover:bg-red-500/20 transition"
            >
              <Trash2 size={14} />
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>

    {/* DELETE MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl backdrop-blur-xl">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Confirm Delete
            </h2>

            <button onClick={() => setShowModal(false)}>
              ✖
            </button>
          </div>

          <p className="text-sm text-gray-300 mb-6">
            Are you sure you want to delete this experience?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                await handleDelete(deleteId);
                setShowModal(false);
                setDeleteId(null);
              }}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white"
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    )}

  </div>
);
}