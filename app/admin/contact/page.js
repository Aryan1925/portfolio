"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import {
  FiMail,
  FiUser,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiMessageSquare,
  FiSearch,
  FiInbox,
  FiRefreshCw,
  FiDownload,
  FiFilter,
} from "react-icons/fi";

import {
  FaRegStar,
  FaInbox,
} from "react-icons/fa";

import {
  MdOutlineMarkEmailUnread,
  MdOutlineMarkEmailRead,
} from "react-icons/md";

export default function ContactAdmin() {

  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("all");

  const [isLoading, setIsLoading] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const messageSectionRef = useRef(null);

  const loadContacts = async () => {

    setIsLoading(true);

    try {

      const res = await fetch("/api/contact", {
        cache: "no-store",
      });

      const data = await res.json();

      setContacts(data.data || []);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load messages");

    } finally {

      setIsLoading(false);

    }
  };

  useEffect(() => {

    loadContacts();

  }, []);

  const deleteContact = async (id) => {

    const res = await fetch(`/api/contact/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      return toast.error("Delete failed");
    }

    toast.success("Message deleted successfully");

    setContacts((prev) =>
      prev.filter((c) => c._id !== id)
    );

    if (selected?._id === id) {
      setSelected(null);
    }
  };

  const markAsRead = async (id) => {

    setIsUpdating(true);

    try {

      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          read: true,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      setContacts((prev) =>
        prev.map((c) =>
          c._id === id
            ? { ...c, read: true }
            : c
        )
      );

      if (selected?._id === id) {

        setSelected({
          ...selected,
          read: true,
        });

      }

      toast.success("Marked as read");

    } catch (error) {

      toast.error("Failed to update");

    } finally {

      setIsUpdating(false);

    }
  };

  const markAsUnread = async (id) => {

    setIsUpdating(true);

    try {

      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          read: false,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      setContacts((prev) =>
        prev.map((c) =>
          c._id === id
            ? { ...c, read: false }
            : c
        )
      );

      if (selected?._id === id) {

        setSelected({
          ...selected,
          read: false,
        });

      }

      toast.success("Marked as unread");

    } catch (error) {

      toast.error("Failed to update");

    } finally {

      setIsUpdating(false);

    }
  };

  const exportToCSV = () => {

    const headers = [
      "Name",
      "Email",
      "Message",
      "Date",
      "Status",
    ];

    const csvData = contacts.map((c) => [
      c.name,
      c.email,
      c.message,
      new Date(c.createdAt).toLocaleString(),
      c.read ? "Read" : "Unread",
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `contacts-${new Date().toISOString().split("T")[0]
      }.csv`;

    a.click();

    URL.revokeObjectURL(url);

    toast.success("Exported to CSV");
  };

  const filteredContacts = contacts
    .filter((c) => {

      const matchesSearch =
        c.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        c.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        c.message
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "read"
            ? c.read === true
            : c.read === false;

      return matchesSearch && matchesFilter;

    })

    .sort((a, b) => {

      if (a.read === b.read) {

        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return a.read - b.read;

    });

  const stats = {

    total: contacts.length,

    unread: contacts.filter((c) => !c.read)
      .length,

    today: contacts.filter((c) => {

      const today =
        new Date().toDateString();

      return (
        new Date(
          c.createdAt
        ).toDateString() === today
      );

    }).length,
  };

  const filterOptions = [

    {
      value: "all",
      label: "All Messages",
      icon: (
        <FaInbox className="w-4 h-4" />
      ),
      count: stats.total,
    },

    {
      value: "unread",
      label: "Unread",
      icon: (
        <MdOutlineMarkEmailUnread className="w-4 h-4" />
      ),
      count: stats.unread,
    },

    {
      value: "read",
      label: "Read",
      icon: (
        <MdOutlineMarkEmailRead className="w-4 h-4" />
      ),
      count:
        stats.total - stats.unread,
    },
  ];

  const getCurrentFilterIcon = () => {

    const current = filterOptions.find(
      (opt) => opt.value === filter
    );

    return (
      current?.icon || (
        <FiFilter className="w-4 h-4" />
      )
    );
  };

  const getCurrentFilterLabel = () => {

    const current = filterOptions.find(
      (opt) => opt.value === filter
    );

    return current?.label || "Filter";
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* HEADER */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

            <div>

              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Message Center
              </h1>

              <p className="text-gray-400 text-sm mt-1">
                Manage and respond to user inquiries
              </p>

            </div>

            <button
              onClick={loadContacts}
              disabled={isLoading}
              className="self-start sm:self-auto p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
            >

              <FiRefreshCw
                className={`w-5 h-5 ${isLoading
                    ? "animate-spin"
                    : ""
                  }`}
              />

            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Total Messages
                  </p>

                  <p className="text-2xl font-bold text-white">
                    {stats.total}
                  </p>

                </div>

                <FiMessageSquare className="w-8 h-8 text-blue-400 opacity-50" />

              </div>

            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-4 border border-purple-500/20">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Unread
                  </p>

                  <p className="text-2xl font-bold text-white">
                    {stats.unread}
                  </p>

                </div>

                <MdOutlineMarkEmailUnread className="w-8 h-8 text-purple-400 opacity-50" />

              </div>

            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-4 border border-green-500/20">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-400 text-sm">
                    Today
                  </p>

                  <p className="text-2xl font-bold text-white">
                    {stats.today}
                  </p>

                </div>

                <FiClock className="w-8 h-8 text-green-400 opacity-50" />

              </div>

            </div>

          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6">

            {/* SEARCH */}
            <div className="w-full lg:flex-1 relative">

              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
              />

            </div>

            {/* FILTER */}
            <div className="relative w-full sm:w-auto">

              <button
                onClick={() =>
                  setIsDropdownOpen(
                    !isDropdownOpen
                  )
                }
                className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
              >

                <div className="flex items-center gap-2">

                  {getCurrentFilterIcon()}

                  <span>
                    {getCurrentFilterLabel()}
                  </span>

                </div>

                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen
                      ? "rotate-180"
                      : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />

                </svg>

              </button>

              <AnimatePresence>

                {isDropdownOpen && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-48 bg-gray-800/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl overflow-hidden z-20"
                  >

                    {filterOptions.map(
                      (option) => (

                        <button
                          key={
                            option.value
                          }
                          onClick={() => {

                            setFilter(
                              option.value
                            );

                            setIsDropdownOpen(
                              false
                            );
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${filter ===
                              option.value
                              ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400"
                              : "text-gray-300 hover:bg-white/10"
                            }`}
                        >

                          {option.icon}

                          <span className="flex-1 text-left">
                            {option.label}
                          </span>

                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                            {
                              option.count
                            }
                          </span>

                        </button>
                      )
                    )}

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

            {/* EXPORT */}
            <button
              onClick={exportToCSV}
              className="w-full sm:w-auto justify-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >

              <FiDownload className="w-4 h-4" />

              Export CSV

            </button>

          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        <div className="flex flex-col xl:flex-row gap-6 xl:h-[calc(100vh-220px)]">

          {/* LEFT PANEL */}
          <div className="w-full xl:w-2/5 2xl:w-1/3 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col max-h-[500px] xl:max-h-none">

            <div className="p-4 border-b border-white/10 bg-white/5">

              <p className="text-sm font-medium text-gray-300">
                {filteredContacts.length}{" "}
                {filteredContacts.length === 1
                  ? "message"
                  : "messages"}
              </p>

            </div>

            <div
              className="
    flex-1
    overflow-y-auto
    scrollbar-thin
    scrollbar-thumb-purple-500/40
    scrollbar-track-transparent
    min-h-0
    max-h-[500px]
    xl:max-h-[calc(100vh-260px)]
  "
            >

              <AnimatePresence>

                {filteredContacts.length === 0 ? (

                  <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">

                    <FiInbox className="w-12 h-12 mb-2" />

                    <p>No messages found</p>

                  </div>

                ) : (

                  filteredContacts.map(
                    (c, index) => (

                      <motion.div
                        key={c._id}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            index * 0.02,
                        }}
                        onClick={() => {

                          setSelected(c);

                          setTimeout(() => {

                            messageSectionRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });

                          }, 100);
                        }}
                        className={`p-4 cursor-pointer border-b border-white/5 transition-all duration-300 ${selected?._id ===
                            c._id
                            ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-l-4 border-purple-500"
                            : "hover:bg-white/5"
                          } ${!c.read
                            ? "bg-white/5"
                            : ""
                          }`}
                      >

                        <div className="flex items-start gap-3">

                          {!c.read && (
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse mt-2 flex-shrink-0" />
                          )}

                          <div className="flex-1 min-w-0">

                            <p className={`font-semibold truncate ${!c.read
                                ? "text-white"
                                : "text-gray-300"
                              }`}>
                              {c.name}
                            </p>

                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {c.email}
                            </p>

                            <p className="text-sm text-gray-400 truncate mt-2">
                              {c.message}
                            </p>

                            <p className="text-xs text-gray-600 mt-2">
                              {new Date(
                                c.createdAt
                              ).toLocaleDateString()}
                            </p>

                          </div>

                        </div>

                      </motion.div>
                    )
                  )
                )}

              </AnimatePresence>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div
            ref={messageSectionRef}
            className="w-full flex-1 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col min-h-[500px]"
          >

            <AnimatePresence mode="wait">

              {!selected ? (

                <motion.div
                  key="empty"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="flex-1 flex flex-col items-center justify-center text-gray-500 p-6 text-center"
                >

                  <FiMail className="w-16 h-16 mb-4 opacity-30" />

                  <p className="text-lg">
                    Select a message to view
                  </p>

                  <p className="text-sm">
                    Click on any message
                  </p>

                </motion.div>

              ) : (

                <motion.div
                  key="detail"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  className="flex-1 flex flex-col overflow-hidden"
                >

                  <div className="p-4 sm:p-6 border-b border-white/10 bg-white/5">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">

                          <FiUser className="w-6 h-6 text-white" />

                        </div>

                        <div className="min-w-0">

                          <h2 className="text-lg sm:text-xl font-bold text-white break-words">
                            {selected.name}
                          </h2>

                          <p className="text-sm text-gray-400 break-all">
                            {selected.email}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">

                        {selected.read ? (

                          <button
                            onClick={() =>
                              markAsUnread(
                                selected._id
                              )
                            }
                            disabled={
                              isUpdating
                            }
                            className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-all duration-300"
                          >

                            <FaRegStar className="w-4 h-4" />

                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              markAsRead(
                                selected._id
                              )
                            }
                            disabled={
                              isUpdating
                            }
                            className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all duration-300"
                          >

                            <FiCheckCircle className="w-4 h-4" />

                          </button>

                        )}

                        <button
                          onClick={() =>
                            deleteContact(
                              selected._id
                            )
                          }
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300"
                        >

                          <FiTrash2 className="w-4 h-4" />

                        </button>

                      </div>

                    </div>

                  </div>

                  <div className="flex-1 overflow-y-auto p-4 sm:p-6">

                    <div className="bg-white/5 rounded-xl p-4 sm:p-6">

                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                        {selected.message}
                      </p>

                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">

                      <div className="flex items-center gap-2 break-all">

                        <FiClock className="w-3 h-3 flex-shrink-0" />

                        <span>
                          Received:{" "}
                          {new Date(
                            selected.createdAt
                          ).toLocaleString()}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <FiMail className="w-3 h-3 flex-shrink-0" />

                        <span>
                          {selected.read
                            ? "Read"
                            : "Unread"}
                        </span>

                      </div>

                    </div>

                    <div className="mt-6">

                      <a
                        href={`mailto:${selected.email}?subject=Re: Your message from portfolio`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300"
                      >

                        <FiMail className="w-4 h-4" />

                        Reply via Email

                      </a>

                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

    </div>
  );
}