import React, { useState } from "react";
import MainLayout from "./layout/MainLayout";

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className = "" }) => {
  const [aiStatus, setAiStatus] = useState<"idle" | "processing" | "speaking">(
    "idle",
  );

  // Demo function to cycle through AI states when clicking the visualization
  const handleAIVisualizationClick = () => {
    setAiStatus((current) => {
      switch (current) {
        case "idle":
          return "processing";
        case "processing":
          return "speaking";
        case "speaking":
          return "idle";
        default:
          return "idle";
      }
    });
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      <MainLayout />

      {/* This div is positioned absolutely to capture clicks on the AI visualization area */}
      <div
        className="absolute top-[60px] left-[300px] right-[600px] bottom-0 cursor-pointer"
        onClick={handleAIVisualizationClick}
        aria-label="Click to change AI status"
      />
    </div>
  );
};

export default Home;
