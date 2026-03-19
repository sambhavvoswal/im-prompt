// components/LogoAnimation.jsx
import { useState, useEffect } from "react";
import frame1 from '../../assets/logo/frame1.png';
import frame2 from '../../assets/logo/frame2.png';
import frame3 from '../../assets/logo/frame3.png';
import frame4 from '../../assets/logo/frame4.png';

const FRAMES = [
  { src: frame1, tagline: "prompt → poster" },
  { src: frame2, tagline: "imagine anything" },
  { src: frame3, tagline: "ai-powered art" },
  { src: frame4, tagline: "your face, your story" },
];

export default function LogoAnimation() {
  const [cur, setCur] = useState(0);
  const [tagline, setTagline] = useState(FRAMES[0].tagline);
  const [tagState, setTagState] = useState("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      setCur(prev => {
        const next = (prev + 1) % FRAMES.length;

        // tagline slide transition
        setTagState("exit");
        setTimeout(() => {
          setTagline(FRAMES[next].tagline);
          setTagState("enter");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setTagState("visible"));
          });
        }, 300);

        return next;
      });
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2.5 cursor-pointer">

      {/* 36x36 image frame */}
      <div className="relative w-9 h-9 rounded-lg overflow-hidden border 
                      border-gray-200 dark:border-gray-800 flex-shrink-0">
        {FRAMES.map((f, i) => (
          <img
            key={i}
            src={f.src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover 
                        transition-opacity duration-[1200ms] ease-in-out
                        ${i === cur ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* text */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-medium leading-none tracking-tight">
          im-prompt
        </span>
        <div className="h-[14px] overflow-hidden">
          <span
            className={`block text-[11px] text-gray-400 leading-none
              transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]
              ${tagState === "visible" ? "translate-y-0 opacity-100" : ""}
              ${tagState === "exit"    ? "-translate-y-full opacity-0" : ""}
              ${tagState === "enter"   ? "translate-y-full opacity-0" : ""}`}
          >
            {tagline}
          </span>
        </div>
      </div>

    </div>
  );
}