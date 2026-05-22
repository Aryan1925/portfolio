"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    level: "",
  });

  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  // auto scroll
  const formRef = useRef(null);

  const loadSkills = async () => {
    try {
      const res = await fetch("/api/skills", {
        cache: "no-store",
      });

      const data = await res.json();
      setSkills(data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load skills");
    }
  };

  // LOAD ON PAGE LOAD
  useEffect(() => {
    (async () => {
      await loadSkills();
    })();
  }, []);

  // ADD / UPDATE
  const addSkill = async () => {
    if (!form.name || !form.category || !form.level) {
      return toast.error("All fields required");
    }

    const url = editingId
      ? `/api/skills/${editingId}`
      : "/api/skills";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.success) {
      return toast.error(data.message || "Failed");
    }

    toast.success(
      editingId ? "Skill Updated" : "Skill Added"
    );

    setForm({
      name: "",
      category: "",
      level: "",
    });

    setEditingId(null);

    await loadSkills();
  };

  // ✅ EDIT + SCROLL
  const handleEdit = (skill) => {
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });

    setEditingId(skill._id);

    // ✅ AUTO SCROLL
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // DELETE
  const deleteSkill = async (id) => {
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        return toast.error("Delete failed");
      }

      toast.success("Deleted");

      setSkills((prev) =>
        prev.filter((s) => s._id !== id)
      );
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div ref={formRef}
    className="space-y-10">

      {/* HEADER */}
      <div >
        <h1 className="text-3xl font-bold">Skills</h1>

        <p className="text-gray-400 text-sm mt-1">
          Manage your technical skills
        </p>
      </div>

      {/* FORM */}
      <div
        
        className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-xl"
      >

        <h2 className="text-lg font-semibold mb-4">
          {editingId
            ? "Edit Skill"
            : "Add New Skill"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="Category (e.g. Frontend)"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            placeholder="Skill Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <select
            value={form.level}
            onChange={(e) =>
              setForm({
                ...form,
                level: e.target.value,
              })
            }
            className="p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">
              Select Level
            </option>

            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="flex items-center gap-3 mt-5">

          <button
            onClick={addSkill}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition font-medium shadow-lg"
          >
            {editingId
              ? "Update Skill"
              : "Add Skill"}
          </button>

          {/* CANCEL BUTTON */}
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);

                setForm({
                  name: "",
                  category: "",
                  level: "",
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
        {skills.map((s) => (
          <div
            key={s._id}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-xl flex justify-between items-center"
          >

            {/* LEFT */}
            <div className="space-y-1">

              <h2 className="font-semibold text-lg">
                {s.name}
              </h2>

              <p className="text-sm text-gray-400">
                {s.category}
              </p>

              <span
                className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                  s.level === "Advanced"
                    ? "bg-green-500/20 text-green-400"
                    : s.level === "Intermediate"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {s.level}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={() => handleEdit(s)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg 
                bg-blue-500/10 text-blue-400 border border-blue-500/20 
                hover:bg-blue-500/20 transition"
              >
                ✏ Edit
              </button>

              <button
                onClick={() => {
                  setDeleteId(s._id);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg 
                bg-red-500/10 text-red-400 border border-red-500/20 
                hover:bg-red-500/20 transition"
              >
                🗑 Delete
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

              <button
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
            </div>

            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to delete this skill?
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
                  await deleteSkill(deleteId);

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