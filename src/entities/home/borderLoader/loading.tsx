"use client";
import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(60), 600);
    const timer3 = setTimeout(() => setProgress(80), 1200);
    const timer4 = setTimeout(() => setProgress(100), 2000);
    const timer5 = setTimeout(() => setVisible(false), 2400);
    const loop = setTimeout(() => {
      setVisible(true);
      setProgress(0);
    }, 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(loop);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(to right, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
          opacity: progress === 100 ? 0 : 1,
          transition: "width 0.5s ease-out, opacity 0.4s ease-out 0.2s",
        }}
      />
    </div>
  );
};

export default Loader;
