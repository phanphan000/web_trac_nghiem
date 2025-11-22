// ArrowCursorProvider.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const ArrowCursorProvider = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const cursorColor = "#1E90FF";

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "arrow-cursor-style";
    const svgCursor = encodeURIComponent(`
     <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <!-- Arrow body -->
            <path d="M2 2 L2 22 L8 16 L12 24 L16 22 L12 14 L20 14 Z" fill="#4A90E2" stroke="#2C3E50" stroke-width="1"/>
            <!-- Arrow highlight -->
            <path d="M2 2 L2 18 L6 14 Z" fill="#6BB6FF" opacity="0.6"/>
            <!-- Star sparkle -->
            <circle cx="28" cy="4" r="2" fill="#FFD700">
                <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="26" cy="8" r="1.5" fill="#FF6B9D">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `);

    style.innerHTML = `
      * {
        cursor: url('data:image/svg+xml;utf8,${svgCursor}') 4 4, auto !important;
      }
      button, a, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"], select {
        cursor: url('data:image/svg+xml;utf8,${svgCursor}') 4 4, pointer !important;
      }
      input[type="text"], input[type="email"], input[type="password"], textarea {
        cursor: url('data:image/svg+xml;utf8,${svgCursor}') 4 4, text !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById("arrow-cursor-style");
      if (existingStyle) document.head.removeChild(existingStyle);
    };
  }, [cursorColor]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-9999"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: "-4px",
          y: "-4px",
        }}
        animate={{ scale: isClicking ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      ></motion.div>

      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-9998 rounded-full border-2"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            x: "-15px",
            y: "-15px",
            borderColor: cursorColor,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-8 h-8" />
        </motion.div>
      )}

      {children}
    </>
  );
};

export default ArrowCursorProvider;
