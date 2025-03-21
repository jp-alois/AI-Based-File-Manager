import React, { useState } from "react";
import Header from "./Header";
import FileExplorer from "../file-explorer/FileExplorer";
import AIVisualization from "../ai-visualization/AIVisualization";
import ChatInterface from "../chat/ChatInterface";
import SettingsDialog from "../settings/SettingsDialog";

interface MainLayoutProps {
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ className = "" }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "processing" | "speaking">(
    "idle",
  );

  // Mock function to handle file selection
  const handleFileSelect = (file: any) => {
    console.log("Selected file:", file);
    // In a real implementation, this would update the chat context with the selected file
  };

  // Mock function to handle settings changes
  const handleSaveAudioSettings = (settings: {
    voiceInput: boolean;
    voiceOutput: boolean;
    volume: number;
  }) => {
    console.log("Audio settings saved:", settings);
    // In a real implementation, this would update the application settings
  };

  // Mock function to handle API key changes
  const handleSaveApiKey = async (apiKey: string): Promise<boolean> => {
    console.log("API key saved:", apiKey);
    // In a real implementation, this would validate and save the API key
    return true;
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gray-50 dark:bg-gray-900 ${className}`}
    >
      <Header title="AI Assistant" />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: File Explorer */}
        <div className="w-[300px] border-r border-gray-200 dark:border-gray-800 overflow-hidden">
          <FileExplorer onFileSelect={handleFileSelect} />
        </div>

        {/* Middle Column: AI Visualization */}
        <div className="flex-1 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
          <AIVisualization status={aiStatus} />
        </div>

        {/* Right Column: Chat Interface */}
        <div className="w-[600px] overflow-hidden">
          <ChatInterface />
        </div>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSaveAudioSettings={handleSaveAudioSettings}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
};

export default MainLayout;
