"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import {
  Menu,
  Search,
  LogOut,
  ShieldCheck,
  Sparkles,
  Bell,
} from "lucide-react";

export default function Navbar({
  collapsed,
  mobileOpen,
  setMobileOpen,
  search,
  setSearch,
  isLoggedIn,
  setIsLoggedIn,
  notifications = [],
}) {

  const [openNotifications, setOpenNotifications] =
    useState(false);

  const notificationRef =
    useRef(null);

  const userName =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")?.name || "Admin"
      : "Admin";

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setIsLoggedIn(false);

    window.location.href =
      "/admin/login";
  };

  // CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-30
        min-h-[72px]
        backdrop-blur-2xl
        border-b border-white/10
        bg-black/30
        transition-all duration-300
        flex items-center justify-between
        px-3 sm:px-4 md:px-8
        overflow-visible
        ${
          isLoggedIn
            ? collapsed
              ? "md:ml-20"
              : "md:ml-64"
            : ""
        }
      `}
    >

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

      {/* LEFT */}
      <div className="relative z-10 flex items-center gap-3 min-w-0">

        {/* MOBILE MENU */}
        {isLoggedIn && (
          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="
              md:hidden
              min-w-[44px]
              w-11 h-11
              rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              hover:bg-white/10
              hover:scale-105
              transition-all duration-300
              shadow-lg
            "
          >
            <Menu size={20} />
          </button>
        )}

        {/* LOGO */}
        <div className="flex items-center gap-3 min-w-0">

          <div
            className="
              w-10 h-10 sm:w-12 sm:h-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              via-cyan-500
              to-purple-500
              flex items-center justify-center
              shadow-xl shadow-blue-500/20
              animate-pulse
              flex-shrink-0
            "
          >
            <Sparkles
              className="text-white"
              size={20}
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-white truncate">
              Admin Dashboard
            </h1>

            <p className="text-[10px] sm:text-xs text-gray-400 truncate">
              Portfolio Control Center
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      {isLoggedIn && (
        <div className="hidden lg:flex flex-1 max-w-xl mx-10 relative z-10">

          <div
            className="
              w-full h-14
              rounded-2xl
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              px-5
              flex items-center gap-3
              hover:border-cyan-500/40
              focus-within:border-cyan-500/50
              transition-all duration-300
              shadow-lg
            "
          >
            <Search
              size={18}
              className="text-cyan-400"
            />

            <input
              type="text"
              placeholder="Search dashboard..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                bg-transparent
                outline-none
                w-full
                text-sm text-white
                placeholder:text-gray-500
              "
            />
          </div>
        </div>
      )}

      {/* RIGHT */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3">

        {isLoggedIn ? (
          <>

            {/* STATUS */}
            <div
              className="
                hidden xl:flex
                items-center gap-2
                px-4 py-2.5
                rounded-2xl
                bg-green-500/10
                border border-green-500/20
                backdrop-blur-xl
              "
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-sm text-green-300 font-medium">
                Online
              </span>
            </div>

            {/* NOTIFICATION */}
            <div
              ref={notificationRef}
              className="relative hidden md:block"
            >
              <button
                onClick={() =>
                  setOpenNotifications(
                    !openNotifications
                  )
                }
                className="
                  relative
                  w-11 h-11
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  flex items-center justify-center
                  hover:bg-white/10
                  hover:scale-105
                  transition-all duration-300
                "
              >
                <Bell
                  size={18}
                  className="text-gray-300"
                />

                {notifications.length >
                  0 && (
                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      min-w-[22px]
                      h-[22px]
                      px-1
                      rounded-full
                      bg-red-500
                      text-white
                      text-[11px]
                      flex items-center justify-center
                      font-bold
                    "
                  >
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* DROPDOWN */}
              {openNotifications && (
                <div
                  className="
                    absolute
                    right-0
                    top-14
                    w-[320px]
                    rounded-3xl
                    bg-[#0f0f0f]
                    border border-white/10
                    shadow-2xl
                    overflow-hidden
                    z-50
                  "
                >
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-white font-semibold">
                      Notifications
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {notifications.length} unread
                      messages
                    </p>
                  </div>

                  <div className="max-h-[320px] overflow-y-auto">

                    {notifications.length ===
                    0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No new messages
                      </div>
                    ) : (
                      notifications
                        .slice(0, 8)
                        .map((item) => (
                          <Link
                            key={item._id}
                            href="/admin/contact"
                            onClick={() =>
                              setOpenNotifications(
                                false
                              )
                            }
                            className="
                              block
                              p-4
                              border-b border-white/5
                              hover:bg-white/5
                              transition
                            "
                          >
                            <p className="text-white font-medium truncate">
                              {item.name}
                            </p>

                            <p className="text-xs text-gray-400 truncate mt-1">
                              New message received
                            </p>
                          </Link>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <div
              className="
                group
                flex items-center gap-2 sm:gap-3
                px-2 sm:px-3 py-2
                rounded-2xl
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                hover:bg-white/10
                transition-all duration-300
                shadow-xl
                min-w-0
              "
            >
              <div
                className="
                  w-10 h-10 sm:w-11 sm:h-11 rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-500
                  to-purple-500
                  flex items-center justify-center
                  font-bold text-white
                  shadow-lg shadow-blue-500/30
                  group-hover:scale-110
                  transition-all duration-300
                  flex-shrink-0
                "
              >
                {userName?.charAt(0)?.toUpperCase()}
              </div>

              <div className="hidden lg:block min-w-0">
                <p className="text-sm font-semibold text-white truncate max-w-[120px]">
                  {userName}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <ShieldCheck
                    size={12}
                    className="text-cyan-400"
                  />
                  Super Admin
                </div>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
                group
                px-3 sm:px-5 py-3
                rounded-2xl
                bg-gradient-to-r
                from-red-500
                to-pink-500
                text-xs sm:text-sm font-semibold text-white
                hover:scale-105
                transition-all duration-300
                shadow-xl shadow-red-500/20
                flex items-center gap-2
                relative overflow-hidden
              "
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

              <LogOut
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />

              <span className="hidden sm:block">
                Logout
              </span>
            </button>
          </>
        ) : (
          <Link
            href="/admin/login"
            className="
              px-4 sm:px-5 py-3
              rounded-2xl
              bg-white/5
              border border-white/10
              text-sm text-white
              hover:bg-white/10
              hover:scale-105
              transition-all duration-300
              backdrop-blur-xl
            "
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}