"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    User,
    Briefcase,
    GraduationCap,
    Code2,
    Rocket,
    Heart,
    Save,
} from "lucide-react";
import Swal from "sweetalert2";

export default function AboutAdmin() {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        role: "",
        experience: "",
        projects: "",
        company: "",
        education: "",
        description1: "",
        description2: "",
        description3: "",
        interests: "",
        updatedAt: "",
    });

    useEffect(() => {
        fetchAbout();
    }, []);

const fetchAbout = async () => {
    try {
        const res = await fetch("/api/about");

        const result = await res.json();

        // console.log(result);

        if (result) {

            const data = result;

            setForm({
                name: data.name || "",
                role: data.role || "",
                experience: data.experience || "",
                projects: data.projects || "",
                company: data.company || "",
                education: data.education || "",
                description1: data.description1 || "",
                description2: data.description2 || "",
                description3: data.description3 || "",
                interests: data.interests || "",
                updatedAt: data.updatedAt || "",
            });

            // console.log(data);
        }

    } catch (error) {
        console.log(error);
    }
};

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
        title: "Save Changes?",
        text: "Do you want to update the About section?",
        icon: "question",
        background: "#0f172a",
        color: "#ffffff",
        showCancelButton: true,
        confirmButtonText: "Yes, Save",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#8b5cf6",
        cancelButtonColor: "#374151",
        reverseButtons: true,
        customClass: {
            popup: "rounded-3xl border border-white/10",
            confirmButton: "rounded-xl px-5 py-2",
            cancelButton: "rounded-xl px-5 py-2",
        },
    });

    if (!result.isConfirmed) return;

    try {
        setLoading(true);

        const res = await fetch("/api/about", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        toast.success(
            data.message || "About Updated Successfully"
        );

    } catch (error) {
        console.log(error);

        toast.error("Something went wrong");

    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    About Section
                </h1>

                <p className="text-gray-400 mt-2">
                    Update your portfolio about information
                </p>
            </div>

            {/* FORM CARD */}
            <div className="max-w-5xl mx-auto">
                <div
                    className="rounded-3xl border border-white/10 
                     bg-white/5 backdrop-blur-xl 
                     shadow-2xl overflow-hidden"
                >
                    {/* TOP BAR */}
                    <div className="h-1.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />

                    <form
                        onSubmit={handleSubmit}
                        className="p-6 md:p-10 space-y-8"
                    >
                        {/* BASIC INFO */}
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <User className="text-purple-400" />
                                Basic Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-300 mb-2 block">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-300 mb-2 block">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        placeholder="Full-Stack Developer"
                                        className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* STATS */}
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Briefcase className="text-cyan-400" />
                                Experience & Stats
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-300 mb-2 block">
                                        Experience
                                    </label>

                                    <input
                                        type="text"
                                        name="experience"
                                        value={form.experience}
                                        onChange={handleChange}
                                        placeholder="4+ Months Experience"
                                        className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-300 mb-2 block">
                                        Projects
                                    </label>

                                    <input
                                        type="text"
                                        name="projects"
                                        value={form.projects}
                                        onChange={handleChange}
                                        placeholder="10+ Projects"
                                        className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-300 mb-2 block">
                                        Company
                                    </label>

                                    <input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        placeholder="SPConsol"
                                        className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-300 mb-2 block">
                                        Education
                                    </label>

                                    <input
                                        type="text"
                                        name="education"
                                        value={form.education}
                                        onChange={handleChange}
                                        placeholder="MCA Student"
                                        className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DESCRIPTIONS */}
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Code2 className="text-purple-400" />
                                About Description
                            </h2>

                            <div className="space-y-5">
                                <textarea
                                    rows={4}
                                    name="description1"
                                    value={form.description1}
                                    onChange={handleChange}
                                    placeholder="First paragraph..."
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition resize-none"
                                />

                                <textarea
                                    rows={4}
                                    name="description2"
                                    value={form.description2}
                                    onChange={handleChange}
                                    placeholder="Second paragraph..."
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500 transition resize-none"
                                />

                                <textarea
                                    rows={4}
                                    name="description3"
                                    value={form.description3}
                                    onChange={handleChange}
                                    placeholder="Third paragraph..."
                                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition resize-none"
                                />
                            </div>
                        </div>

                        {/* INTERESTS */}
                        <div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Heart className="text-pink-500" />
                                Interests
                            </h2>

                            <textarea
                                rows={4}
                                name="interests"
                                value={form.interests}
                                onChange={handleChange}
                                placeholder="Gaming, Music, Reading..."
                                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-pink-500 transition resize-none"
                            />

                            <p className="text-gray-500 text-sm mt-2">
                                Separate interests with commas
                            </p>
                        </div>
                        {/* LAST UPDATED */}
                        <div
                            className="rounded-2xl border border-white/10 
             bg-white/5 backdrop-blur-xl p-5"
                        >
                            <div className="flex items-center justify-between flex-wrap gap-3">

                                <div>
                                    <h3 className="text-sm text-gray-400">
                                        Last Updated
                                    </h3>

                                    <p className="text-lg font-semibold text-white mt-1">
                                        {form.updatedAt
                                            ? new Date(form.updatedAt).toLocaleString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "Not Updated Yet"}
                                    </p>
                                </div>

                                <div
                                    className="px-4 py-2 rounded-xl 
                 bg-gradient-to-r from-purple-500/20 to-cyan-500/20
                 border border-white/10 text-sm text-gray-300"
                                >
                                    Auto Synced
                                </div>

                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 
                           text-white font-semibold flex items-center justify-center gap-2
                           hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-purple-500/20"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save About Section
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}