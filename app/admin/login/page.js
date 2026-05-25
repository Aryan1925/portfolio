"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
// import { GoogleLogin } from "@react-oauth/google";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Shield,
  Fingerprint,
  Zap,
  Crown,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window !== "undefined") {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    return { width: 0, height: 0 };
  });
  const [particles, setParticles] = useState(() => {
    const initialParticles = [];
    for (let i = 0; i < 30; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 800,
        y: Math.random() * 800,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }
    return initialParticles;
  });
  const [confetti, setConfetti] = useState([]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showSuccess && windowSize.width) {
      const newConfetti = [];
      for (let i = 0; i < 50; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * windowSize.width,
          delay: i * 0.05,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        });
      }
      setConfetti(newConfetti);
    }
  }, [showSuccess, windowSize.width]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  }
);
      const data = await res.json();
      if (data.access_token) {
        // Save Token
        localStorage.setItem("token", data.access_token);

        // Decode JWT Payload
        const payload = JSON.parse(atob(data.access_token.split(".")[1]));

        // Save User
        localStorage.setItem("user", JSON.stringify(payload));

        // Success Animation
        setShowSuccess(true);

        setTimeout(() => {
          router.push("/admin");
        }, 3000);
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: data.message || "Invalid Email or Password",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          background: "rgba(15,15,15,0.95)",
          color: "#fff",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Server Error",
        showConfirmButton: false,
        timer: 2500,
        background: "rgba(15,15,15,0.95)",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[999] bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl animate-ping" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />

        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: c.color,
              left: c.x,
              top: -20,
              animation: `fall 2s linear ${c.delay}s forwards`,
            }}
          />
        ))}

        <div
          className="relative z-10 text-center"
          style={{ animation: "popup 0.5s ease-out" }}
        >
          <div
            className="w-36 h-36 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 
                        flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/50 animate-bounce"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white mt-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-300 text-xl mt-4">Login Successful</p>
          <p className="text-gray-400 text-md mt-2">
            Redirecting to dashboard in 3 seconds...
          </p>

          <div className="mt-10 w-72 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div
              className="w-full h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              style={{ animation: "shrink 3s linear forwards" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* LEFT SIDE - ANIMATION */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-900/50 to-cyan-900/50">
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                animation: `floatUp ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          style={{ animation: "spinSlow 20s linear infinite" }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ animation: "spinSlowReverse 25s linear infinite" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12">
          <div
            className="text-center"
            style={{ animation: "fadeIn 0.8s ease-out" }}
          >
            <div
              className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 
                          flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse-slow"
            >
              <Crown className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-5xl font-bold text-white mb-4">Admin Portal</h2>
            <p className="text-gray-300 text-lg mb-8">
              Secure access to your portfolio dashboard
            </p>

            <div className="space-y-4">
              <div
                className="flex items-center gap-3 text-gray-300"
                style={{
                  animation: "slideRight 0.5s ease-out forwards",
                  opacity: 0,
                }}
              >
                <Zap className="w-5 h-5 text-purple-400" />
                <span>Manage messages & inquiries</span>
              </div>
              <div
                className="flex items-center gap-3 text-gray-300"
                style={{
                  animation: "slideRight 0.5s ease-out 0.2s forwards",
                  opacity: 0,
                }}
              >
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Secure admin authentication</span>
              </div>
              <div
                className="flex items-center gap-3 text-gray-300"
                style={{
                  animation: "slideRight 0.5s ease-out 0.4s forwards",
                  opacity: 0,
                }}
              >
                <Fingerprint className="w-5 h-5 text-purple-400" />
                <span>Full control over content</span>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-20 left-12 right-12 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10"
            style={{ animation: "floatVertical 3s ease-in-out infinite" }}
          >
            <p className="text-gray-400 text-sm text-center">
              🔒 Your data is protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl"
            style={{ animation: "floatVertical 8s ease-in-out infinite" }}
          />
        </div>

        <div
          className="w-full max-w-md relative z-10"
          style={{ animation: "slideUp 0.6s ease-out" }}
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-500">
            <div
              className="h-1.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
              }}
            />

            <div className="p-8 md:p-10">
              <div
                className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 
                            flex items-center justify-center shadow-lg shadow-purple-500/30 mx-auto mb-6 
                            hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer
                            animate-float-slow"
              >
                <Shield size={36} className="text-white" />
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs mb-4 animate-pulse-slow">
                  <Sparkles size={14} />
                  Welcome Back Admin
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Sign In
                </h1>
                <p className="text-gray-400 mt-2">
                  Access your portfolio dashboard
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="group">
                  <label className="text-sm text-gray-300 mb-2 block group-hover:text-purple-400 transition-colors">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 px-4 h-14 rounded-2xl bg-white/5 border border-white/10 focus-within:border-purple-400 transition-all group-hover:border-purple-500/50">
                    <Mail
                      size={18}
                      className="text-purple-400 group-hover:scale-110 transition-transform"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm text-gray-300 mb-2 block group-hover:text-cyan-400 transition-colors">
                    Password
                  </label>
                  <div className="flex items-center gap-3 px-4 h-14 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cyan-400 transition-all group-hover:border-cyan-500/50">
                    <Lock
                      size={18}
                      className="text-cyan-400 group-hover:scale-110 transition-transform"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 
                           text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 
                           shadow-xl shadow-purple-500/20 disabled:opacity-50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40
                           relative overflow-hidden"
                  style={{
                    backgroundSize: "200% 200%",
                    animation: "gradient 3s ease infinite",
                  }}
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Simple Social Login Options - Using text instead of icons to avoid import errors */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 py-1 bg-gray-800/50 rounded-full text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-6 justify-center">

                  <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 text-sm text-gray-400 hover:text-white font-medium">
                    Google
                  </button>
                  <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 text-sm text-gray-400 hover:text-white font-medium">
                    GitHub
                  </button>
                </div>
              </div>

              {/* <p className="text-center text-gray-400 mt-8">
                Don’t have an account?{" "}
                <Link
                  href="/admin/Register"
                  className="text-purple-400 hover:text-purple-300 font-medium transition hover:underline"
                >
                  Create Account
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes shrink {
            0% { width: 100%; }
            100% { width: 0%; }
          }
          @keyframes fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
          @keyframes floatUp {
            0%, 100% { transform: translateY(0); opacity: 0; }
            50% { transform: translateY(-100px); opacity: 1; }
          }
          @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spinSlowReverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideRight {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes popup {
            0% { transform: scale(0.3); opacity: 0; }
            80% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes floatVertical {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(15px); }
          }
          .animate-float-slow {
            animation: floatVertical 4s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
        `,
        }}
      />
    </div>
  );
}
