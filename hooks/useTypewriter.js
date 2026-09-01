"use client";

import { useState, useEffect, useCallback } from "react";

export default function useTypewriter(
  strings,
  {
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseAfterType = 1500,
    pauseAfterDelete = 500,
  } = {}
) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  const tick = useCallback(() => {
    const current = strings[index];

    if (!isDeleting) {
      setText(current.slice(0, text.length + 1));

      if (text.length + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), pauseAfterType);
        return;
      }
    } else {
      setText(current.slice(0, text.length - 1));

      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % strings.length);
        return;
      }
    }
  }, [text, isDeleting, index, strings, pauseAfterType]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return text;
}
