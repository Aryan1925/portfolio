"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/admin/Navbar";

import Sidebar from "../components/admin/Sidebar";

import ProtectedRoute from "../components/admin/ProtectedRoute";

export default function AdminLayout({
  children,
}) {

  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  // NEW
  const [notifications, setNotifications] =
    useState([]);

  // FETCH CONTACTS
  const fetchNotifications = async () => {
    try {

      const res = await fetch("/api/contact", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {

        const unread =
          data.data.filter(
            (item) => item.read === false
          );

        setNotifications(unread);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // AUTO REFRESH
  useEffect(() => {

    if (!isLoggedIn) return;

    fetchNotifications();

    const interval =
      setInterval(() => {
        fetchNotifications();
      }, 5000);

    return () =>
      clearInterval(interval);

  }, [isLoggedIn]);

  return (

    <ProtectedRoute
      setIsLoggedIn={setIsLoggedIn}
    >

      <div className="min-h-screen flex bg-black text-white">

        {/* SIDEBAR */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          isLoggedIn={isLoggedIn}
          search={search}

          // NEW
          unreadCount={notifications.length}
        />

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          {/* NAVBAR */}
          <Navbar
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            search={search}
            setSearch={setSearch}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}

            // NEW
            notifications={notifications}
          />

          {/* CONTENT */}
          <main
            className={`
              flex-1
              p-2
              transition-all duration-300
              ${
                isLoggedIn
                  ? collapsed
                    ? "md:ml-20"
                    : "md:ml-64"
                  : ""
              }
            `}
          >
            {children}
          </main>
        </div>
      </div>

    </ProtectedRoute>
  );
}