"use client";

import { useState, useEffect } from "react";
import { Trash2, Eye, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function ResumeAdmin() {

  const [file, setFile] = useState(null);

  const [uploadedResume, setUploadedResume] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [resumeData, setResumeData] = useState({
    title: "",
    projects: "",
    experience: "",
    technologies: "",
    highlights: "",
    description1: "",
    description2: "",
  });

  // Function to open PDF in browser preview (NOT download)
  const openPDF = (url) => {

    fetch(url)
      .then(response => response.blob())
      .then(blob => {

        const blobUrl = URL.createObjectURL(blob);

        window.open(blobUrl, "_blank");

        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

      })
      .catch(error => {

        console.error("Failed to load PDF:", error);

        toast.error("Failed to load PDF");

      });
  };

  // Function to download PDF with custom filename
  const downloadPDF = async (url, fileName) => {

    try {

      const response = await fetch(url);

      const blob = await response.blob();

      const link = document.createElement("a");

      const blobUrl = URL.createObjectURL(blob);

      link.href = blobUrl;

      link.download = fileName || "Aryan-Resume.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);

    } catch (error) {

      console.error("Download failed:", error);

      toast.error("Download failed");

    }
  };

  useEffect(() => {

    const loadResume = async () => {

      try {

        const res = await fetch("/api/resume");

        const data = await res.json();

        if (data.success && data.data) {

          setUploadedResume({
            name: data.data.fileName,
            url: data.data.fileUrl,
            time: new Date(data.data.createdAt).toLocaleString(),
          });

          setResumeData({
            title: data.data.title || "",
            projects: data.data.projects || "",
            experience: data.data.experience || "",
            technologies: data.data.technologies || "",
            highlights: data.data.highlights || "",
            description1: data.data.description1 || "",
            description2: data.data.description2 || "",
          });
        }

      } catch (err) {

        console.log(err);

      }
    };

    loadResume();

  }, []);

  const uploadResume = async () => {

    if (!file) {

      return toast.error("Select PDF");

    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {

      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {

        throw new Error(data.message || "Upload failed");

      }

      setUploadedResume({
        name: data.data.fileName,
        url: data.data.fileUrl,
        time: new Date().toLocaleString(),
      });

      toast.success("Resume uploaded");

      setFile(null);

    } catch (err) {

      console.log(err);

      toast.error(err.message || "Upload failed");

    } finally {

      setIsLoading(false);

    }
  };

  const updateResumeDetails = async () => {

    try {

      const res = await fetch("/api/resume", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      const data = await res.json();

      if (!data.success) {

        return toast.error("Update failed");

      }

      toast.success("Resume details updated");

      setShowUpdateModal(false);

    } catch (err) {

      console.log(err);

      toast.error("Something went wrong");

    }
  };

  const deleteResume = async () => {

    try {

      const res = await fetch("/api/resume", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {

        return toast.error("Delete failed");

      }

      setUploadedResume(null);

      setFile(null);

      toast.success("Resume deleted");

    } catch (err) {

      console.log(err);

      toast.error("Something went wrong");

    }
  };

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Resume Manager
      </h1>

      {/* UPLOAD SECTION */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-xl">

        <label
          className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed 
          border-white/20 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-white/5 
          transition-all duration-300 bg-black/20"
        >

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {

              const selected = e.target.files?.[0];

              if (selected) {

                setFile(selected);

              }
            }}
            className="hidden"
          />

          <span className="text-sm text-gray-200 font-medium">

            {file ? `📄 ${file.name}` : "Click here to choose PDF"}

          </span>

          <span className="text-xs text-gray-500 mt-2">
            Only PDF files allowed (Max 5MB)
          </span>

        </label>

        <div className="flex justify-end mt-5">

          <button
            onClick={uploadResume}
            disabled={!file || isLoading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
            hover:scale-105 hover:shadow-blue-500/30 hover:shadow-2xl
            transition-all duration-300 font-medium shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            cursor-pointer"
          >

            {isLoading ? "Uploading..." : "Upload Resume"}

          </button>

        </div>

      </div>

      {/* RESUME DETAILS */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-4xl">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-semibold text-white">
            Resume Details
          </h2>

          <button
            onClick={() => setShowUpdateModal(true)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
            hover:scale-105 transition-all duration-300 text-white font-medium"
          >
            Update Details
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Title"
            value={resumeData.title}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                title: e.target.value,
              })
            }
            className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none text-white"
          />

          <input
            type="text"
            placeholder="Projects"
            value={resumeData.projects}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                projects: e.target.value,
              })
            }
            className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none text-white"
          />

          <input
            type="text"
            placeholder="Experience"
            value={resumeData.experience}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                experience: e.target.value,
              })
            }
            className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none text-white"
          />

          <input
            type="text"
            placeholder="Technologies"
            value={resumeData.technologies}
            onChange={(e) =>
              setResumeData({
                ...resumeData,
                technologies: e.target.value,
              })
            }
            className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none text-white"
          />

        </div>

        <textarea
          placeholder="Description Paragraph 1"
          value={resumeData.description1}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              description1: e.target.value,
            })
          }
          rows={5}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none text-white"
        />

        <textarea
          placeholder="Description Paragraph 2"
          value={resumeData.description2}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              description2: e.target.value,
            })
          }
          rows={5}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none text-white"
        />

        <textarea
          placeholder="Key Highlights"
          value={resumeData.highlights}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              highlights: e.target.value,
            })
          }
          rows={6}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none text-white"
        />

      </div>

      {/* CURRENT RESUME */}
      {uploadedResume && (

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">

          <p className="text-sm text-gray-400 mb-2">
            Current Resume
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <p className="text-sm font-medium text-white">
                📄 {uploadedResume.name}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Uploaded on {uploadedResume.time}
              </p>

            </div>

            <div className="flex items-center gap-3 flex-wrap">

              <div
                className="px-3 py-1 rounded-full text-xs 
                bg-green-500/20 text-green-400 border border-green-500/20"
              >
                Active
              </div>

              <button
                onClick={() => openPDF(uploadedResume.url)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg
                bg-blue-500/10 text-blue-400 border border-blue-500/20
                hover:bg-blue-500/20 transition-all duration-300 cursor-pointer"
              >

                <Eye size={14} />

                View PDF

              </button>

              <button
                onClick={() =>
                  downloadPDF(
                    uploadedResume.url,
                    "Aryan-Resume.pdf"
                  )
                }
                className="flex items-center gap-1 px-3 py-1 rounded-lg
                bg-green-500/10 text-green-400 border border-green-500/20
                hover:bg-green-500/20 transition-all duration-300 cursor-pointer"
              >

                <Download size={14} />

                Download

              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg
                bg-red-500/10 text-red-400 border border-red-500/20
                hover:bg-red-500/20 transition-all duration-300 cursor-pointer"
              >

                <Trash2 size={14} />

                Delete

              </button>

            </div>

          </div>

        </div>
      )}

      {/* UPDATE MODAL */}
      {showUpdateModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl backdrop-blur-xl">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold text-white">
                Confirm Update
              </h2>

              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                ✖
              </button>

            </div>

            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to update resume details?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-white"
              >
                Cancel
              </button>

              <button
                onClick={updateResumeDetails}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white"
              >
                Update
              </button>

            </div>

          </div>

        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl backdrop-blur-xl">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold text-white">
                Confirm Delete
              </h2>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                ✖
              </button>

            </div>

            <p className="text-sm text-gray-300 mb-6">

              Are you sure you want to delete "
              {uploadedResume?.name || "the resume"}
              "?

            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-white"
              >
                Cancel
              </button>

              <button
                onClick={async () => {

                  await deleteResume();

                  setShowDeleteModal(false);

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