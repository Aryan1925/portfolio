"use client";

import { useEffect,useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Pencil, Trash2, X } from "lucide-react";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
  });

  const formRef = useRef(null);

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects", {
        cache: "no-store",
      });
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await loadProjects();
    })();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      return toast.error("Required fields missing");
    }

    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    toast.success(editingId ? "Updated!" : "Added!");

    setForm({
      title: "",
      description: "",
      tech: "",
      github: "",
      live: "",
    });

    setEditingId(null);
    loadProjects();
  };

  const handleEdit = (p) => {
    setForm({
      title: p.title,
      description: p.description,
      tech: p.tech.join(", "),
      github: p.github,
      live: p.live,
    });
    setEditingId(p._id);

      formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    loadProjects();
  };

  return (
    <div  ref={formRef}
    className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your portfolio projects
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Project" : "Add New Project"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            placeholder="Tech (comma separated)"
            value={form.tech}
            onChange={(e) => setForm({ ...form, tech: e.target.value })}
            className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            placeholder="GitHub URL"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            placeholder="Live URL"
            value={form.live}
            onChange={(e) => setForm({ ...form, live: e.target.value })}
            className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <textarea
          placeholder="Project Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full mt-4 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div className="flex gap-3 mt-5">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition font-medium shadow-lg"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  description: "",
                  tech: "",
                  github: "",
                  live: "",
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
        {projects.map((p, index) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-xl flex flex-col md:flex-row md:justify-between gap-4"
          >
            {/* LEFT */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">{p.title}</h2>

              <p className="text-sm text-gray-400">{p.description}</p>

              {/* TECH TAGS */}
              <div className="flex flex-wrap gap-2 mt-2">
                {p.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* LINKS */}
              <div className="flex gap-4 text-sm mt-2">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    className="text-green-400 hover:underline"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 items-start md:items-center">
              {/* EDIT */}
              <button
                onClick={() => handleEdit(p)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg 
                 bg-blue-500/10 text-blue-400 border border-blue-500/20 
                 hover:bg-blue-500/20 transition"
              >
                <Pencil size={14} />
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => {
                  setDeleteId(p._id);
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
          </motion.div>
        ))}
      </div>
        {showModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/10 border border-white/20 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl backdrop-blur-xl"
    >
      {/* CLOSE */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Confirm Delete
        </h2>

        <button onClick={() => setShowModal(false)}>
          <X size={18} />
        </button>
      </div>

      {/* MESSAGE */}
      <p className="text-sm text-gray-300 mb-6">
        Are you sure you want to delete this project? This action cannot be undone.
      </p>

      {/* ACTIONS */}
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
    </motion.div>
  </div>
)}

    </div>
  );
}
