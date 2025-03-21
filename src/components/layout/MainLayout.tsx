import React, { useState } from "react";
import Header from "./Header";
import FileExplorer from "../file-explorer/FileExplorer";
import AIVisualization from "../ai-visualization/AIVisualization";
import ChatInterface from "../chat/ChatInterface";
import SettingsDialog from "../settings/SettingsDialog";
import {
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  PanelRight,
  CircleOff,
} from "lucide-react";
import { Button } from "../ui/button";

interface MainLayoutProps {
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ className = "" }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState<"idle" | "processing" | "speaking">(
    "idle",
  );

  // Panel visibility states
  const [fileExplorerVisible, setFileExplorerVisible] = useState(true);
  const [aiVisualizationVisible, setAiVisualizationVisible] = useState(true);
  const [chatInterfaceVisible, setChatInterfaceVisible] = useState(true);

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
      <Header title="AI Assistant">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFileExplorerVisible(!fileExplorerVisible)}
            title={
              fileExplorerVisible ? "Hide File Explorer" : "Show File Explorer"
            }
          >
            <PanelLeft
              className={`h-5 w-5 ${!fileExplorerVisible && "text-gray-400"}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAiVisualizationVisible(!aiVisualizationVisible)}
            title={
              aiVisualizationVisible
                ? "Hide AI Visualization"
                : "Show AI Visualization"
            }
          >
            <CircleOff
              className={`h-5 w-5 ${!aiVisualizationVisible && "text-gray-400"}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setChatInterfaceVisible(!chatInterfaceVisible)}
            title={
              chatInterfaceVisible
                ? "Hide Chat Interface"
                : "Show Chat Interface"
            }
          >
            <PanelRight
              className={`h-5 w-5 ${!chatInterfaceVisible && "text-gray-400"}`}
            />
          </Button>
        </div>
      </Header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: File Explorer */}
        {fileExplorerVisible && (
          <div
            className="relative flex flex-col border-r border-gray-200 dark:border-gray-800 overflow-hidden"
            style={{ width: fileExplorerVisible ? "300px" : "0" }}
          >
            <FileExplorer onFileSelect={handleFileSelect} />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-full"
              onClick={() => setFileExplorerVisible(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Middle Column: AI Visualization */}
        {aiVisualizationVisible && (
          <div className="relative flex-1 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
            <AIVisualization status={aiStatus} />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-full"
              onClick={() => setAiVisualizationVisible(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Right Column: Chat Interface */}
        {chatInterfaceVisible && (
          <div
            className="relative overflow-hidden"
            style={{ width: chatInterfaceVisible ? "600px" : "0" }}
          >
            <ChatInterface />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 z-10 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-full"
              onClick={() => setChatInterfaceVisible(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Show collapsed panel buttons */}
        <div className="flex items-center justify-center space-x-2 p-2">
          {!fileExplorerVisible && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFileExplorerVisible(true)}
              className="flex items-center space-x-1"
            >
              <PanelLeft className="h-4 w-4" />
              <span>Files</span>
            </Button>
          )}
          {!aiVisualizationVisible && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAiVisualizationVisible(true)}
              className="flex items-center space-x-1"
            >
              <CircleOff className="h-4 w-4" />
              <span>AI</span>
            </Button>
          )}
          {!chatInterfaceVisible && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatInterfaceVisible(true)}
              className="flex items-center space-x-1"
            >
              <PanelRight className="h-4 w-4" />
              <span>Chat</span>
            </Button>
          )}
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
