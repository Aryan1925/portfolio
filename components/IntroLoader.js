"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_TEXTS } from "@/lib/IntroTextPaths";

// -----------------------------------------
// Per-letter handwriting draw timings (s)
// -----------------------------------------

const HELLO = {
  n: INTRO_TEXTS.hello.paths.length,
  start: 0.35,
  stagger: 0.26,
  dur: 1.2,
  hold: 0.6,
};

const NAME = {
  n: INTRO_TEXTS.name.paths.length,
  start: 0.2,
  stagger: 0.19,
  dur: 1.1,
  hold: 0.7,
};

const TAGLINE = {
  n: INTRO_TEXTS.tagline.paths.length,
  start: NAME.start + (NAME.n - 1) * NAME.stagger + NAME.dur + 0.25,
  stagger: 0.05,
  dur: 0.5,
  hold: 0.6,
};

// Phase durations (ms) used by the state machine
const HELLO_PHASE_MS = (HELLO.start + (HELLO.n - 1) * HELLO.stagger + HELLO.dur + HELLO.hold) * 1000;
const NAME_PHASE_MS =
  (TAGLINE.start + (TAGLINE.n - 1) * TAGLINE.stagger + TAGLINE.dur + TAGLINE.hold) * 1000;
const EXIT_MS = 650;
const OVERLAY_SLIDE_MS = 1200;
const SAFETY_MS = 15000;

const EASE = [0.16, 1, 0.3, 1];

const subscribe = () => () => {};

// Renders one set of glyph strokes, animated to draw like a pen.
function HandText({ data, stroke, timing, className }) {
  const { paths, viewBox, strokeWidth } = data;

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={stroke.id} x1="0%" y1="0%" x2="100%" y2="0%">
          {stroke.stops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <motion.path
          key={`${stroke.id}-${i}`}
          d={d}
          fill="none"
          stroke={`url(#${stroke.id})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: timing.start + i * timing.stagger,
            duration: timing.dur,
            ease: EASE,
          }}
        />
      ))}
    </svg>
  );
}

export default function IntroLoader() {
  const overlayRef = useRef(null);

  const [phase, setPhase] = useState("hello"); // "hello" | "name"
  const [slideUp, setSlideUp] = useState(false);
  const [done, setDone] = useState(false);

  const introAlreadyShown = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("introShown") === "1",
    () => false
  );

  const removeSplash = useCallback(() => {
    document.getElementById("init-splash")?.remove();
  }, []);

  // Phase state machine: Hello draws -> exits -> name draws -> slide up
  useEffect(() => {
    if (introAlreadyShown) return;

    let t;

    if (phase === "hello") {
      t = setTimeout(() => setPhase("name"), HELLO_PHASE_MS);
    } else {
      t = setTimeout(() => setSlideUp(true), NAME_PHASE_MS);
    }

    return () => clearTimeout(t);
  }, [phase, introAlreadyShown]);

  // Safety net — never let the intro get stuck
  useEffect(() => {
    if (introAlreadyShown) return;
    const t = setTimeout(() => setSlideUp(true), SAFETY_MS);
    return () => clearTimeout(t);
  }, [introAlreadyShown]);

  if (introAlreadyShown || done) {
    return <div ref={removeSplash} />;
  }

  return (
    <motion.div
      ref={(node) => {
        overlayRef.current = node;

        if (node) {
          removeSplash();
        }
      }}
      initial={{ y: 0 }}
      animate={slideUp ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: OVERLAY_SLIDE_MS / 1000,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (slideUp) {
          sessionStorage.setItem("introShown", "1");
          setDone(true);
        }
      }}
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        overflow-hidden
        bg-[#050508]
        text-white
      "
    >
      {/* =========================================
          BACKGROUND
      ========================================== */}

      {/* Base gradient */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_50%,#17112d_0%,#08080d_45%,#030304_100%)]
        "
      />

      {/* Purple glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [0.8, 1.15, 0.8],
          x: [-20, 30, -20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[35rem]
          w-[35rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-600/20
          blur-[120px]
          pointer-events-none
        "
      />

      {/* Blue glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [0.9, 1.2, 0.9],
          x: [80, -60, 80],
          y: [-40, 40, -40],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[55%]
          top-[45%]
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-blue-500/20
          blur-[120px]
          pointer-events-none
        "
      />

      {/* Pink glow */}
      <motion.div
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[25%]
          top-[30%]
          h-[20rem]
          w-[20rem]
          rounded-full
          bg-fuchsia-500/10
          blur-[100px]
          pointer-events-none
        "
      />

      {/* Subtle grid */}
      <div
        className="
          absolute inset-0
          opacity-[0.035]
          pointer-events-none
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      {/* =========================================
          CONTENT
      ========================================== */}

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Top indicator */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.05,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-10
            flex items-center gap-2
            text-[10px]
            md:text-xs
            uppercase
            tracking-[0.35em]
            text-white/35
          "
        >
          <span className="h-1 w-1 rounded-full bg-purple-400" />
          Welcome
          <span className="h-1 w-1 rounded-full bg-blue-400" />
        </motion.div>

        {/* =========================================
            HANDWRITING SEQUENCE
        ========================================== */}

        <AnimatePresence mode="wait">
          {phase === "hello" && (
            <motion.div
              key="hello"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: -14,
                scale: 0.96,
                filter: "blur(12px)",
                transition: {
                  duration: EXIT_MS / 1000,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              className="flex items-center justify-center"
            >
              <HandText
                data={INTRO_TEXTS.hello}
                timing={HELLO}
                className="block w-[min(82vw,36rem)]"
                stroke={{
                  id: "intro-hello-stroke",
                  stops: [
                    { offset: "0%", color: "#a78bfa" },
                    { offset: "50%", color: "#e879f9" },
                    { offset: "100%", color: "#60a5fa" },
                  ],
                }}
              />
            </motion.div>
          )}

          {phase === "name" && (
            <motion.div
              key="name"
              initial={{
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: NAME.start,
                duration: EXIT_MS / 1000,
                ease: EASE,
              }}
              className="flex flex-col items-center justify-center gap-6"
            >
              <HandText
                data={INTRO_TEXTS.name}
                timing={NAME}
                className="block w-[min(70vw,30rem)]"
                stroke={{
                  id: "intro-name-stroke",
                  stops: [
                    { offset: "0%", color: "#ffffff" },
                    { offset: "60%", color: "#ffffffcc" },
                    { offset: "100%", color: "#ffffff80" },
                  ],
                }}
              />
              <HandText
                data={INTRO_TEXTS.tagline}
                timing={TAGLINE}
                className="block w-[min(80vw,26rem)]"
                stroke={{
                  id: "intro-tagline-stroke",
                  stops: [
                    { offset: "0%", color: "#ffffffaa" },
                    { offset: "60%", color: "#ffffff88" },
                    { offset: "100%", color: "#ffffff66" },
                  ],
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================
          TOP / BOTTOM VIGNETTE
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]
        "
      />
    </motion.div>
  );
}