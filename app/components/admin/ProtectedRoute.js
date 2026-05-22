"use client";

import { useEffect, useState } from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

export default function ProtectedRoute({
  children,
  setIsLoggedIn,
}) {

  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      const token =
        localStorage.getItem("token");

      const publicRoutes = [
        "/admin/login",
        "/admin/Register",
      ];

      const isPublicRoute =
        publicRoutes.includes(pathname);

      // NOT LOGGED IN
      if (!token && !isPublicRoute) {

        setIsLoggedIn(false);

        router.push("/admin/login");

        return;
      }

      // LOGGED IN
      if (token) {

        setIsLoggedIn(true);

        // prevent opening login/register again
        if (isPublicRoute) {

          router.push("/admin");

          return;
        }
      }

      setTimeout(() => {
        setLoading(false);
      }, 0);
    };

    checkAuth();

  }, [pathname, router, setIsLoggedIn]);

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-black
          flex items-center justify-center
          text-white
        "
      >
        Loading...
      </div>
    );
  }

  return children;
}