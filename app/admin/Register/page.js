"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  Rocket,
  Star,
  Gem,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState([]);
  const [stars, setStars] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 800,
        y: Math.random() * 800,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (showSuccess && windowSize.width) {
      const newStars = [];
      for (let i = 0; i < 20; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: i * 0.1,
        });
      }
      setStars(newStars);
    }
  }, [showSuccess, windowSize.width]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/admin/login");
        }, 2000);
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: data.message || "Something went wrong",
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
      <div className="fixed inset-0 z-[999] bg-gradient-to-br from-gray-900 via-cyan-900 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-3xl animate-ping" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute text-yellow-400"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animation: `twinkle 1.5s ease-in-out ${star.delay}s infinite`,
            }}
          >
            <Star className="w-3 h-3" fill="gold" />
          </div>
        ))}

        <div
          className="relative z-10 text-center"
          style={{ animation: "popup 0.5s ease-out" }}
        >
          <div
            className="w-36 h-36 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 
                        flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/50 animate-bounce"
          >
            <div style={{ animation: "spinOnce 0.5s ease-out" }}>
              <UserPlus className="w-16 h-16 text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white mt-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Aboard!
          </h1>
          <p className="text-gray-300 text-xl mt-4">
            Account Created Successfully
          </p>
          <p className="text-gray-400 text-md mt-2">
            Redirecting to login in 2 seconds...
          </p>

          <div className="mt-10 flex justify-center">
            <svg className="w-16 h-16 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#ringGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="175.9"
                style={{ animation: "ring 2s linear forwards" }}
              />
              <defs>
                <linearGradient
                  id="ringGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* LEFT SIDE - ANIMATION */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-cyan-900/50 to-purple-900/50">
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
          className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ animation: "spinSlow 20s linear infinite" }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          style={{ animation: "spinSlowReverse 25s linear infinite" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12">
          <div
            className="text-center"
            style={{ animation: "fadeIn 0.8s ease-out" }}
          >
            <div
              className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 
                          flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse-slow"
            >
              <Rocket className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-5xl font-bold text-white mb-4">
              Join the Team
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Create your admin account to manage your portfolio
            </p>

            <div className="space-y-4">
              <div
                className="flex items-center gap-3 text-gray-300"
                style={{
                  animation: "slideRight 0.5s ease-out forwards",
                  opacity: 0,
                }}
              >
                <Gem className="w-5 h-5 text-cyan-400" />
                <span>Full portfolio management</span>
              </div>
              <div
                className="flex items-center gap-3 text-gray-300"
                style={{
                  animation: "slideRight 0.5s ease-out 0.2s forwards",
                  opacity: 0,
                }}
              >
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <span>Secure admin dashboard</span>
              </div>
              <div
                className="flex items-center gap-3 text-gray-300"
                style={{
                  animation: "slideRight 0.5s ease-out 0.4s forwards",
                  opacity: 0,
                }}
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Real-time updates & analytics</span>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-12 left-12 right-12 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10"
            style={{ animation: "floatVertical 3s ease-in-out infinite" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
              <div>
                <p className="text-white text-sm font-medium">
                  Join 1,000+ Admins
                </p>
                <p className="text-gray-400 text-xs">
                  Managing their portfolios with us
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - REGISTER FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl"
            style={{ animation: "floatVertical 8s ease-in-out infinite" }}
          />
        </div>

        <div
          className="w-full max-w-md relative z-10"
          style={{ animation: "slideUp 0.6s ease-out" }}
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden hover:shadow-cyan-500/20 transition-all duration-500">
            <div
              className="h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
              }}
            />

            <div className="p-8 md:p-10">
              <div
                className="w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 
                            flex items-center justify-center shadow-lg shadow-cyan-500/30 mx-auto mb-6
                            hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer
                            animate-float-slow"
              >
                <UserPlus size={36} className="text-white" />
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs mb-4 animate-pulse-slow">
                  <Sparkles size={14} />
                  Create Your Admin Account
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Register
                </h1>
                <p className="text-gray-400 mt-2">
                  Create your secure admin account
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                {/* Name */}
                {/* Name */}
                <div className="group">
                  <label className="text-sm text-gray-300 mb-2 block group-hover:text-cyan-400 transition-colors">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 px-4 h-14 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cyan-400 transition-all group-hover:border-cyan-500/50">
                    <UserPlus
                      size={18}
                      className="text-cyan-400 group-hover:scale-110 transition-transform"
                    />

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm text-gray-300 mb-2 block group-hover:text-cyan-400 transition-colors">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 px-4 h-14 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cyan-400 transition-all group-hover:border-cyan-500/50">
                    <Mail
                      size={18}
                      className="text-cyan-400 group-hover:scale-110 transition-transform"
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
                  <label className="text-sm text-gray-300 mb-2 block group-hover:text-purple-400 transition-colors">
                    Password
                  </label>
                  <div className="flex items-center gap-3 px-4 h-14 rounded-2xl bg-white/5 border border-white/10 focus-within:border-purple-400 transition-all group-hover:border-purple-500/50">
                    <Lock
                      size={18}
                      className="text-purple-400 group-hover:scale-110 transition-transform"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create password"
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

                <div className="flex items-center gap-3 p-4 rounded-2xl border border-cyan-500/10 bg-cyan-500/5">
                  <ShieldCheck size={20} className="text-cyan-400" />
                  <p className="text-sm text-gray-300">
                    Your password is encrypted and secure.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 
                           text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 
                           shadow-xl shadow-cyan-500/20 disabled:opacity-50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/40
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
                      Create Account
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-gray-400 mt-8">
                Already have an account?{" "}
                <Link
                  href="/admin/login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition hover:underline"
                >
                  Sign In
                </Link>
              </p>
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
          @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1); }
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
          @keyframes spinOnce {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes ring {
            0% { stroke-dashoffset: 175.9; }
            100% { stroke-dashoffset: 0; }
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
