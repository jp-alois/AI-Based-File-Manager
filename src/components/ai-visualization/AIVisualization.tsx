import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AIVisualizationProps {
  status?: "idle" | "processing" | "speaking";
  size?: number;
  color?: string;
}

const AIVisualization: React.FC<AIVisualizationProps> = ({
  status = "idle",
  size = 300,
  color = "#3b82f6", // Tailwind blue-500
}) => {
  const [animationProps, setAnimationProps] = useState({
    scale: 1,
    opacity: 0.7,
    blur: "20px",
    duration: 3,
  });

  useEffect(() => {
    switch (status) {
      case "idle":
        setAnimationProps({
          scale: 1,
          opacity: 0.7,
          blur: "20px",
          duration: 3,
        });
        break;
      case "processing":
        setAnimationProps({
          scale: 1.1,
          opacity: 0.8,
          blur: "25px",
          duration: 1.5,
        });
        break;
      case "speaking":
        setAnimationProps({
          scale: 1.2,
          opacity: 0.9,
          blur: "30px",
          duration: 0.8,
        });
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-gray-900">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Aura effect */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: color,
            filter: `blur(${animationProps.blur})`,
            top: 0,
            left: 0,
          }}
          animate={{
            scale: [1, animationProps.scale, 1],
            opacity: [
              animationProps.opacity * 0.7,
              animationProps.opacity,
              animationProps.opacity * 0.7,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: animationProps.duration,
            ease: "easeInOut",
          }}
        />

        {/* Core circle */}
        <motion.div
          className="absolute rounded-full bg-white dark:bg-gray-800"
          style={{
            width: "70%",
            height: "70%",
            top: "15%",
            left: "15%",
            boxShadow: `0 0 15px 5px rgba(59, 130, 246, 0.3)`,
          }}
          animate={{
            scale: status === "idle" ? 1 : [1, 1.05, 1],
          }}
          transition={{
            repeat: status !== "idle" ? Infinity : 0,
            duration: status === "speaking" ? 0.5 : 1.5,
            ease: "easeInOut",
          }}
        >
          {/* Optional: Add an icon or text inside the circle */}
          <div className="flex items-center justify-center w-full h-full text-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
        </motion.div>

        {/* Status indicator */}
        <div className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium text-gray-600 dark:text-gray-300 mt-4">
          {status === "idle" && "AI Assistant Ready"}
          {status === "processing" && "Processing..."}
          {status === "speaking" && "Speaking..."}
        </div>
      </div>
    </div>
  );
};

export default AIVisualization;
