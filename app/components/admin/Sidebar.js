"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Briefcase,
  Mail,
  ChevronLeft,
  ChevronRight,
  FileText,
  BadgeInfo,
  X,
} from "lucide-react";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  isLoggedIn,
  search,
  unreadCount,
}) {
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/about",
      label: "About Section",
      icon: BadgeInfo,
    },
    {
      href: "/admin/skills",
      label: "Skills",
      icon: Code2,
    },
    {
      href: "/admin/projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      href: "/admin/experience",
      label: "Experience",
      icon: Briefcase,
    },
    {
      href: "/admin/resume",
      label: "Resume",
      icon: FileText,
    },
    {
      href: "/admin/contact",
      label: "Contacts",
      icon: Mail,
      count: unreadCount,
    },
  ];

  const filteredLinks = navLinks.filter(
    (item) =>
      item.label
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const navItem = (
    href,
    label,
    Icon,
    count
  ) => {
    const isActive =
      href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(href);

    return (
      <Link
        key={href}
        href={href}
        onClick={() =>
          setMobileOpen(false)
        }
        className={`
          relative
          group flex items-center justify-between
          px-4 py-3 rounded-2xl
          transition-all duration-300
          border
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg shadow-blue-500/20"
              : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }
        `}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon
            size={20}
            className="group-hover:scale-110 transition flex-shrink-0"
          />

          {!collapsed && (
            <span className="font-medium truncate">
              {label}
            </span>
          )}
        </div>

        {!collapsed &&
          count > 0 && (
            <div
              className="
                min-w-[24px]
                h-6
                px-2
                rounded-full
                bg-red-500
                text-white
                text-xs
                font-bold
                flex items-center justify-center
                animate-pulse
                shadow-lg shadow-red-500/30
              "
            >
              {count > 99
                ? "99+"
                : count}
            </div>
          )}

        {collapsed &&
          count > 0 && (
            <div
              className="
                absolute
                right-2
                top-2
                w-5
                h-5
                rounded-full
                bg-red-500
                text-white
                text-[10px]
                font-bold
                flex items-center justify-center
                animate-pulse
              "
            >
              {count > 9
                ? "9+"
                : count}
            </div>
          )}
      </Link>
    );
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          bg-black/40 backdrop-blur-2xl
          border-r border-white/10
          transition-all duration-300
          p-4
          overflow-y-auto
          ${
            collapsed
              ? "md:w-20"
              : "w-[85%] max-w-[300px] md:w-64"
          }
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-white truncate">
                Admin
              </h1>

              <p className="text-xs text-gray-400 truncate">
                Portfolio Panel
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* DESKTOP COLLAPSE */}
            <button
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
              className="
                hidden md:flex
                w-10 h-10
                rounded-xl
                bg-white/5
                border border-white/10
                items-center justify-center
                text-gray-400
                hover:text-white
                hover:bg-white/10
                transition
              "
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>

            {/* MOBILE CLOSE */}
            <button
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                md:hidden
                w-10 h-10
                rounded-xl
                bg-white/5
                border border-white/10
                flex items-center justify-center
                text-gray-400
                hover:text-white
                hover:bg-white/10
                transition
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-3">
          {filteredLinks.map(
            (item) =>
              navItem(
                item.href,
                item.label,
                item.icon,
                item.count
              )
          )}
        </nav>
      </aside>
    </>
  );
}